import React, { useState, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';
import { Hallway } from './components/Hallway';
import { HUD } from './components/HUD';
import { QuestionModal } from './components/QuestionModal';
import { PrincipalModal } from './components/PrincipalModal';
import { Leaderboard } from './components/Leaderboard';
import { QUESTIONS, CONFIGS } from './constants';
import { Difficulty, GameMode, PlayerStats, Question } from './types';
import { audio } from './services/audio';

function App() {
  const [screen, setScreen] = useState<'MENU' | 'GAME' | 'LEADERBOARD'>('MENU');
  const [config, setConfig] = useState(CONFIGS.EASY);
  const [playerIdx, setPlayerIdx] = useState(0);
  const [stats, setStats] = useState<PlayerStats>({ energy: 100, social: 10, score: 0 });
  const [doorStates, setDoorStates] = useState<boolean[]>([]); // true if solved
  const [unlockedDoor, setUnlockedDoor] = useState(0); // The furthest door index reached
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [showPrincipal, setShowPrincipal] = useState(false);
  const [playerState, setPlayerState] = useState<'idle' | 'walking' | 'jump' | 'sad'>('idle');
  const [gameOverMsg, setGameOverMsg] = useState<string | null>(null);
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);

  // Movement Logic
  const move = (dir: 'left' | 'right') => {
    if (activeQuestion || showPrincipal || gameOverMsg) return;
    
    setPlayerState('walking');
    
    // Add small delay to animation before actually changing index
    setTimeout(() => {
        setPlayerIdx(prev => {
            const next = dir === 'right' ? prev + 1 : prev - 1;
            
            // Boundary checks
            if (next < 0) return 0;
            if (next >= config.lockerCount) return config.lockerCount - 1;
            
            // Progression check: Cannot walk past the unlocked door
            if (dir === 'right' && next > unlockedDoor) {
                // Shake or feedback could go here
                return prev;
            }

            return next;
        });
        // Stop walking animation shortly after
        setTimeout(() => setPlayerState('idle'), 200);
    }, 50);
  };

  const handleDoorClick = (idx: number) => {
    // Only can open the door we are standing in front of (or very close)
    // And acts as auto-walk if clicked
    if (Math.abs(playerIdx - idx) > 0) {
        // Can only auto-walk if it's unlocked
        if (idx <= unlockedDoor) {
            setPlayerIdx(idx); 
            setTimeout(() => interact(idx), 300);
        }
    } else {
        interact(idx);
    }
  };

  const interact = (idx: number) => {
    if (doorStates[idx]) return; // Already solved
    
    // Check if principal door (last one)
    if (idx === config.lockerCount - 1) {
        // Must solve previous doors first? (In this logic, yes, because unlockedDoor won't reach here otherwise)
        setShowPrincipal(true);
        return;
    }

    // Open Question
    const q = gameQuestions[idx % gameQuestions.length];
    setActiveQuestion(q);
  };

  const handleStart = (diff: Difficulty, mode: GameMode) => {
    const newConfig = CONFIGS[diff];
    setConfig(newConfig);
    setStats({ energy: 100, social: 10, score: 0 });
    setPlayerIdx(0);
    setUnlockedDoor(0);
    setDoorStates(new Array(newConfig.lockerCount).fill(false));
    setGameOverMsg(null);
    setShowPrincipal(false);
    
    // Shuffle questions
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    setGameQuestions(shuffled);

    setScreen('GAME');
  };

  const handleAnswer = (correct: boolean) => {
    setActiveQuestion(null);
    
    if (correct) {
        setStats(prev => ({
            ...prev,
            social: Math.min(10, prev.social + 1),
            score: prev.score + (config.difficulty === 'HARD' ? 30 : config.difficulty === 'NORMAL' ? 20 : 10)
        }));
        
        setDoorStates(prev => {
            const next = [...prev];
            if (playerIdx < next.length) next[playerIdx] = true;
            return next;
        });

        // Unlock next door if we are at the current frontier
        if (playerIdx === unlockedDoor) {
            setUnlockedDoor(prev => Math.min(config.lockerCount - 1, prev + 1));
        }

        setPlayerState('jump');
        setTimeout(() => setPlayerState('idle'), 1000);
    } else {
        setStats(prev => ({
            ...prev,
            energy: Math.max(0, prev.energy - config.energyPenalty),
            social: Math.max(0, prev.social - config.socialPenalty)
        }));
        setPlayerState('sad');
        setTimeout(() => setPlayerState('idle'), 2000);
    }
  };

  // Check Game Over
  useEffect(() => {
    if (screen !== 'GAME') return;

    if (stats.energy <= 0) {
        audio.playWrong();
        setGameOverMsg("BẠN ĐÃ KIỆT SỨC! HÃY NGHỈ NGƠI VÀ THỬ LẠI.");
    } else if (stats.social <= 0) {
        audio.playWrong();
        setGameOverMsg("UY TÍN MẠNG QUÁ THẤP! BẠN CẦN CẨN TRỌNG HƠN.");
    }
  }, [stats, screen]);

  // Controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
        if (screen !== 'GAME') return;
        if (e.key === 'ArrowLeft') move('left');
        if (e.key === 'ArrowRight') move('right');
        if (e.key === ' ' || e.key === 'Enter') handleDoorClick(playerIdx);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [screen, playerIdx, activeQuestion, showPrincipal, unlockedDoor]);

  return (
    <div className="w-full h-screen bg-slate-900 text-slate-800 overflow-hidden relative font-sans select-none">
      
      {screen === 'MENU' && (
        <StartScreen onStart={handleStart} onShowLB={() => setScreen('LEADERBOARD')} />
      )}

      {screen === 'LEADERBOARD' && (
        <Leaderboard 
          show={true} 
          onClose={() => setScreen('MENU')} 
          newScore={gameOverMsg ? stats.score : undefined}
        />
      )}

      {screen === 'GAME' && (
        <>
            <HUD stats={stats} level={config.difficulty} />
            
            <Hallway 
                playerIndex={playerIdx} 
                totalDoors={config.lockerCount} 
                playerState={playerState}
                onDoorClick={handleDoorClick}
                doorStates={doorStates}
                unlockedDoor={unlockedDoor}
            />

            {/* Mobile Controls Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-40 pointer-events-none">
                <div className="flex gap-4 pointer-events-auto">
                    <button 
                        onMouseDown={() => move('left')}
                        className="w-16 h-16 bg-white/20 backdrop-blur border-2 border-slate-500 rounded-full text-3xl shadow-lg active:scale-90 transition-transform text-white hover:bg-white/30"
                    >⬅️</button>
                    <button 
                        onMouseDown={() => move('right')}
                        className={`w-16 h-16 backdrop-blur border-2 border-slate-500 rounded-full text-3xl shadow-lg active:scale-90 transition-transform text-white ${playerIdx >= unlockedDoor ? 'bg-red-500/20 opacity-50 cursor-not-allowed' : 'bg-white/20 hover:bg-white/30'}`}
                    >➡️</button>
                </div>
                
                {/* Only show interaction button if interaction is needed or available */}
                <button 
                    onClick={() => handleDoorClick(playerIdx)}
                    className={`w-24 h-24 rounded-full font-black text-xl shadow-xl active:translate-y-2 transition-all pointer-events-auto flex items-center justify-center flex-col
                        ${doorStates[playerIdx] 
                            ? 'bg-green-600 border-b-8 border-green-800 text-white' 
                            : 'bg-orange-500 border-b-8 border-orange-700 text-white animate-pulse'
                        }`}
                >
                    {doorStates[playerIdx] ? 'ĐÃ XONG' : 'MỞ CỬA'}
                    {!doorStates[playerIdx] && <span className="text-[10px] uppercase font-normal mt-1">Trả lời để đi tiếp</span>}
                </button>
            </div>

            {/* Modals */}
            {activeQuestion && (
                <QuestionModal 
                    question={activeQuestion} 
                    timeLimit={config.timePerQuestion}
                    onAnswer={handleAnswer}
                    onClose={() => setActiveQuestion(null)}
                />
            )}

            {showPrincipal && (
                <PrincipalModal onClose={() => {
                    setShowPrincipal(false);
                    setStats(prev => ({...prev, score: prev.score + 50})); // Bonus
                    setGameOverMsg("CHÚC MỪNG! BẠN ĐÃ HOÀN THÀNH KHÓA HỌC AN TOÀN.");
                }} />
            )}

            {/* Game Over / Win Modal */}
            {gameOverMsg && (
                <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-8 max-w-md text-center shadow-2xl animate-popIn border-4 border-slate-800">
                        <h2 className={`text-3xl font-black mb-4 ${gameOverMsg.includes('CHÚC MỪNG') ? 'text-green-600' : 'text-red-600'}`}>
                            {gameOverMsg.includes('CHÚC MỪNG') ? '🏆 CHIẾN THẮNG!' : '💀 GAME OVER'}
                        </h2>
                        <p className="mb-6 font-bold text-slate-600 text-lg leading-snug">{gameOverMsg}</p>
                        <div className="text-5xl font-black text-yellow-500 mb-8 drop-shadow-sm">{stats.score} ĐIỂM</div>
                        
                        <div className="flex gap-4 justify-center">
                            <button onClick={() => setScreen('MENU')} className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">Menu Chính</button>
                            <button onClick={() => {
                                setScreen('LEADERBOARD');
                            }} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">Lưu Điểm</button>
                        </div>
                    </div>
                </div>
            )}
        </>
      )}

    </div>
  );
}

export default App;