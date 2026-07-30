import type { Testimonial } from "@/types";

const NAMES = [
  "Nguyễn Minh Anh", "Trần Bảo Châu", "Lê Quốc Huy", "Phạm Thu Hà",
  "Đỗ Gia Bảo", "Vũ Ngọc Lan", "Hoàng Đức Anh", "Bùi Thanh Trúc",
  "Ngô Khánh Vy", "Đặng Hải Nam", "Trịnh Diễm My", "Phan Anh Tuấn",
  "Lý Bảo Ngọc", "Dương Việt Hoàng", "Mai Thảo Nguyên", "Sarah Johnson",
  "Michael Chen", "Emma Williams", "Takeshi Yamamoto", "Sophie Laurent",
  "David Kim", "Isabella Rossi", "James Anderson", "Yuki Tanaka", "Olivia Brown",
];

const ROLES = [
  "Thực khách thân thiết", "Food Blogger", "Doanh nhân", "Nhiếp ảnh gia ẩm thực",
  "Khách du lịch", "Chuyên gia dinh dưỡng", "Nhà văn", "Giám đốc sáng tạo",
];

const CONTENTS = [
  "Không gian yên tĩnh, tinh tế đến từng chi tiết. Mỗi món ăn đều được chăm chút như một tác phẩm nghệ thuật.",
  "Lần đầu tiên tôi cảm nhận ẩm thực chay có thể sang trọng và tinh tế đến vậy. Chắc chắn sẽ quay lại.",
  "Đội ngũ phục vụ chuyên nghiệp, am hiểu từng nguyên liệu trong thực đơn. Trải nghiệm đáng nhớ.",
  "Món súp bí đỏ và cơm sen là điểm nhấn tuyệt vời. Hương vị cân bằng, thanh nhẹ mà vẫn đậm đà.",
  "Thiết kế không gian mang hơi hướng Nhật Bản kết hợp thiên nhiên rất thư giãn, phù hợp cho bữa tối đặc biệt.",
  "Giá trị tương xứng với chất lượng. Từng chi tiết nhỏ đều thể hiện sự chỉn chu của nhà hàng.",
  "Nguyên liệu hữu cơ tươi ngon, có thể cảm nhận rõ sự khác biệt so với các nhà hàng chay khác.",
  "Buổi tối kỷ niệm của chúng tôi trở nên hoàn hảo nhờ không gian và ẩm thực nơi đây.",
];

export const testimonials: Testimonial[] = Array.from({ length: 25 }, (_, i) => ({
  id: `testimonial-${String(i + 1).padStart(3, "0")}`,
  name: NAMES[i],
  role: ROLES[i % ROLES.length],
  avatar: `/images/team/avatar-${(i % 12) + 1}.jpg`,
  rating: ((i % 2 === 0 ? 5 : 4) as 4 | 5),
  content: CONTENTS[i % CONTENTS.length],
  date: new Date(2026, (i % 12), (i % 27) + 1).toISOString(),
}));
