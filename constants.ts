import { Difficulty, GameConfig, Question } from './types';

export const QUESTIONS: Question[] = [
  { q: "Người lạ trên mạng nhắn “muốn gặp bạn ngoài đời để tặng quà sinh nhật”.", a: ["Nhận lời ngay","Rủ thêm bạn đi cùng","Báo cha mẹ và không đi","Hỏi địa điểm trước"], c: 2, lesson: "Không gặp người quen qua mạng nếu không có người lớn đi cùng." },
  { q: "Một người nhắn “mình biết bí mật của bạn, ra gặp mình để nói riêng nhé”.", a: ["Đi gặp để giải thích","Gửi bạn thân đi cùng","Báo cha mẹ hoặc thầy cô","Gặp ở nơi đông người"], c: 2, lesson: "Đây có thể là chiêu đe dọa hoặc gài bẫy, cần báo người lớn ngay." },
  { q: "Tài khoản “anh trai tốt bụng” hứa cho tiền tiêu vặt nếu bạn ra quán cà phê gặp.", a: ["Đi vì thấy quen","Nhờ bạn đi cùng","Báo cha mẹ và không đi","Hỏi thêm để tin tưởng"], c: 2, lesson: "Kẻ xấu thường dùng quà hoặc tiền để dụ trẻ gặp mặt trực tiếp." },
  { q: "Một người lạ gửi hình “vé xem phim miễn phí” mời bạn đi riêng.", a: ["Đi xem cho vui","Hỏi cha mẹ rồi quyết","Báo người lớn, không đi","Gửi ảnh cảm ơn"], c: 2, lesson: "Không nên gặp người lạ chỉ vì quà tặng hoặc lời mời hấp dẫn." },
  { q: "Người lạ nhắn “muốn chụp ảnh nghệ thuật” và hẹn bạn ở công viên.", a: ["Đi vì chụp ảnh công khai","Báo cha mẹ, không tự đi","Gửi bạn đi trước","Hẹn ở chỗ khác"], c: 1, lesson: "Chụp ảnh “nghệ thuật” là chiêu lừa phổ biến – tuyệt đối không đi một mình." },
  { q: "Một tài khoản tự xưng là “người của chương trình truyền hình” mời bạn đến quay thử.", a: ["Nhận lời ngay","Tra cứu thông tin chương trình","Gửi ảnh xác nhận","Gọi điện cho người đó"], c: 1, lesson: "Luôn xác minh thông tin với người lớn trước khi tham gia." },
  { q: "Người lạ nói “mình đang ở gần nhà bạn, ra ngoài chút đi, mình có chuyện muốn nói”.", a: ["Ra xem có gì","Nhắn lại hỏi rõ hơn","Gọi cha mẹ hoặc người lớn","Ra nhưng đứng xa"], c: 2, lesson: "Không ra ngoài khi có người lạ hẹn – có thể là kẻ theo dõi hoặc dụ dỗ." },
  { q: "Một người trên mạng xin “địa chỉ để gửi thư tỏ tình”.", a: ["Gửi địa chỉ thật","Gửi địa chỉ bạn thân","Không gửi và chặn","Gửi đại một địa chỉ"], c: 2, lesson: "Không chia sẻ địa chỉ cá nhân cho người quen qua mạng." },
  { q: "Bạn quen người qua game, họ rủ “ra quán net gặp cho vui”.", a: ["Đồng ý vì quen rồi","Hỏi cha mẹ","Báo người lớn, không đi","Nhờ bạn đi cùng"], c: 2, lesson: "Nhiều vụ bắt cóc bắt đầu từ các mối quen trong game online." },
  { q: "Người lạ nói “anh đang gần trường em, ra cổng một lát nhé”.", a: ["Ra cho biết mặt","Gọi bạn đi cùng","Báo thầy cô, bảo vệ","Đứng từ xa quan sát"], c: 2, lesson: "Nếu có người lạ chờ ngoài cổng trường, hãy báo người lớn ngay." },
  { q: "Tài khoản lạ gửi ảnh “vé xem ca nhạc”, nhờ bạn đến điểm hẹn lấy.", a: ["Đi lấy vì không mất tiền","Nhờ cha mẹ xác minh","Báo người lớn, không đến","Rủ nhóm bạn đi"], c: 2, lesson: "Không nhận quà từ người lạ – đó có thể là bẫy dụ gặp mặt." },
  { q: "Một người lạ dọa “biết nhà bạn, nếu không ra gặp sẽ hại gia đình bạn”.", a: ["Đi gặp để xin tha","Báo cha mẹ hoặc công an","Gửi tiền xin lỗi","Im lặng"], c: 1, lesson: "Đây là hành vi đe dọa, cần báo ngay cho cơ quan chức năng." },
  { q: "Người lạ giả danh “anh trai của bạn học” muốn đến đón bạn tan trường.", a: ["Đi theo vì thấy quen","Gọi điện xác minh với bạn học","Đi cùng nhóm bạn","Hỏi thêm để chắc chắn"], c: 1, lesson: "Chỉ đi với người được cha mẹ hoặc thầy cô xác nhận." },
  { q: "Một người lạ gửi hình đồ chơi và nói “muốn tặng em bé dễ thương này món quà”.", a: ["Gửi địa chỉ nhận","Cảm ơn và chặn liên hệ","Hỏi xem tặng gì","Nhờ bạn nhận"], c: 1, lesson: "Không nhận quà online từ người không quen biết." },
  { q: "Người quen trên mạng hẹn “đến trường em để chụp ảnh kỷ niệm”.", a: ["Cho phép","Báo thầy cô hoặc bảo vệ","Ra gặp ở cổng","Gửi ảnh từ xa"], c: 1, lesson: "Không cho người lạ tới trường tìm mình." },
  { q: "Một người hứa “sẽ nhận làm anh nuôi, gửi quà hằng tháng”, yêu cầu bạn gửi ảnh và thông tin cá nhân.", a: ["Gửi ngay","Hỏi cha mẹ","Báo người lớn và chặn","Gửi ảnh thử"], c: 2, lesson: "“Anh nuôi, chị nuôi” ảo là chiêu tiếp cận để dụ dỗ, lừa đảo." },
  { q: "Muốn đón đi ăn để “cảm ơn vì đã giúp đỡ trong game”.", a: ["Đi cho vui","Rủ bạn đi cùng","Báo người lớn và từ chối","Hẹn chỗ khác"], c: 2, lesson: "Không đi ăn uống với người lạ quen qua mạng." },
  { q: "Người lạ ở cổng trường vẫy tay: “Ra đây chú cho quà”.", a: ["Ra nhận","Hỏi ai đấy","Chạy vào báo thầy cô","Nhờ bạn ra"], c: 2, lesson: "Không lại gần người lạ ở cổng trường." },
  { q: "Link lạ: “Đăng ký CLB quốc tế”, yêu cầu điền thông tin.", a: ["Điền ngay cho nhanh","Kiểm tra nguồn trang web","Hỏi thầy cô hoặc cha mẹ","Cả B và C đúng"], c: 3, lesson: "Không điền thông tin vào đường link không rõ nguồn." },
  { q: "Bạn mới quen xin “ảnh đồng phục trường” làm kỷ niệm.", a: ["Gửi ảnh vì thấy thân","Gửi ảnh nhóm cho an toàn","Không gửi và chặn liên hệ","Hỏi lý do trước"], c: 2, lesson: "Ảnh đồng phục có thể tiết lộ trường học, giúp kẻ xấu định vị bạn." },
  { q: "Người lạ nhờ: “Ra đầu ngõ nhận đồ giúp chú”.", a: ["Ra ngay để giúp","Gọi cha mẹ hoặc người lớn ra cùng","Nhờ hàng xóm đi thay","Hỏi đồ gì"], c: 1, lesson: "Không tự ý ra ngõ gặp người lạ một mình." },
  { q: "Xưng “cảnh sát mạng” đòi số CCCD để kiểm tra.", a: ["Gửi ngay vì sợ bị phạt","Báo cha mẹ hoặc thầy cô","Gửi nhưng che số","Im lặng"], c: 1, lesson: "Cảnh sát thật không yêu cầu CCCD qua mạng, đây là lừa đảo mạo danh." },
  { q: "“Chú đi công tác gần nhà, cho địa chỉ ghé thăm”.", a: ["Gửi địa chỉ vì thấy lịch sự","Gửi địa chỉ trường học","Không gửi và chặn","Hỏi quà gì"], c: 2, lesson: "Giữ kín địa chỉ nhà trước người lạ." },
  { q: "Tài khoản hotgirl rủ gặp ở trung tâm thương mại.", a: ["Đi cho biết","Báo người lớn, không đi","Rủ bạn","Hẹn chỗ đông"], c: 1, lesson: "Ảnh đại diện có thể là giả mạo để lừa gạt." },
  { q: "“Cô đang gần nhà, ra đây cô cho đồ ăn ngon”.", a: ["Ra ngay","Gọi cha mẹ","Hỏi cô ở đâu","Rủ bạn"], c: 1, lesson: "Không ăn đồ ăn từ người lạ đưa." },
  { q: "Xưng “nhà báo” muốn phỏng vấn riêng tại quán cafe.", a: ["Nhận lời vì thấy hay","Báo thầy cô hoặc cha mẹ","Cho số điện thoại","Hẹn online"], c: 1, lesson: "Phỏng vấn cần có sự giám hộ của người lớn/nhà trường." },
  { q: "Nick lạ ảnh giống bạn thân gửi lời mời kết bạn.", a: ["Chấp nhận","Nhắn hỏi xác minh","Báo người thân","Gửi tin thử"], c: 2, lesson: "Cẩn thận mạo danh, hãy xác minh qua kênh khác." },
  { q: "Rủ quay video TikTok chung, hẹn ở bãi xe vắng.", a: ["Đồng ý vì thấy nổi tiếng","Rủ bạn đi cùng","Báo người lớn và không tham gia","Hỏi kỹ rồi quyết định"], c: 2, lesson: "Không đến chỗ vắng vẻ với người lạ." },
  { q: "Email: “Trúng học bổng”, yêu cầu nộp phí trước.", a: ["Điền và chuyển tiền ngay","Gửi cho thầy cô kiểm tra","Giữ suất","Tra Google"], c: 1, lesson: "Học bổng thật không bao giờ đòi phí nộp trước." },
  { q: "“Chú là bạn bố, bố nhờ đón con đi học thêm”.", a: ["Đi ngay vì tin tưởng","Gọi cha mẹ xác minh","Đi cùng bạn","Quan sát"], c: 1, lesson: "Luôn gọi điện xác nhận với bố mẹ trước khi lên xe." }
];

export const CONFIGS: Record<Difficulty, GameConfig> = {
  EASY: {
    difficulty: 'EASY',
    mode: 'CLASSIC',
    lockerCount: 10,
    timePerQuestion: 45,
    energyPenalty: 10,
    socialPenalty: 1,
  },
  NORMAL: {
    difficulty: 'NORMAL',
    mode: 'CLASSIC',
    lockerCount: 20,
    timePerQuestion: 30,
    energyPenalty: 20,
    socialPenalty: 2,
  },
  HARD: {
    difficulty: 'HARD',
    mode: 'CLASSIC',
    lockerCount: 30, // Full game
    timePerQuestion: 15,
    energyPenalty: 30,
    socialPenalty: 3,
  },
};