import type { BlogPost } from "@/types";
import { slugify } from "@/lib/utils";

const RAW: Omit<BlogPost, "id" | "slug" | "coverImage" | "readingTime">[] = [
  { title: "Triết Lý Ẩm Thực Chay Đương Đại Tại Lotus & Earth", excerpt: "Khám phá hành trình chúng tôi kết hợp tinh hoa ẩm thực chay truyền thống với kỹ thuật fine dining hiện đại.", content: "Ẩm thực chay không chỉ là một lựa chọn ăn uống, mà là một triết lý sống...\n\nTại Lotus & Earth, mỗi món ăn được xây dựng trên nền tảng tôn trọng nguyên liệu, mùa vụ và sự cân bằng...\n\nChúng tôi tin rằng sự sang trọng thực sự nằm ở sự tinh giản và chân thực.", author: "Chef Lê Minh Quân", publishedAt: "2026-01-10", category: "Triết Lý", tags: ["triết-lý", "vegan", "fine-dining"] },
  { title: "Hành Trình Từ Nông Trại Đến Bàn Ăn", excerpt: "Câu chuyện về những nông trại hữu cơ đối tác cung cấp nguyên liệu tươi ngon mỗi ngày.", content: "Mỗi sáng sớm, đội ngũ thu mua của chúng tôi có mặt tại các nông trại hữu cơ...\n\nViệc lựa chọn nguyên liệu đầu vào quyết định 70% chất lượng món ăn cuối cùng...", author: "Đội ngũ Lotus & Earth", publishedAt: "2026-01-20", category: "Nguyên Liệu", tags: ["nguyên-liệu", "vegan", "fine-dining"] },
  { title: "5 Món Chay Không Thể Bỏ Lỡ Mùa Này", excerpt: "Gợi ý những món ăn đặc sắc nhất trong thực đơn mùa xuân năm nay.", content: "Mùa xuân mang đến nguồn nguyên liệu phong phú...\n\nTừ cơm sen hoàng cung đến súp bí đỏ nước cốt dừa, mỗi món đều kể một câu chuyện riêng...", author: "Chef Nguyễn Thảo Vy", publishedAt: "2026-02-05", category: "Thực Đơn", tags: ["thực-đơn", "vegan", "fine-dining"] },
  { title: "Nghệ Thuật Pha Trà Trong Văn Hóa Fine Dining", excerpt: "Tìm hiểu cách trà được kết hợp tinh tế cùng thực đơn tại nhà hàng.", content: "Trà không chỉ là thức uống, mà là một nghi thức...\n\nĐội ngũ sommelier của chúng tôi dành nhiều năm nghiên cứu cách phối trà cùng từng món ăn...", author: "Hoàng Bảo Trâm", publishedAt: "2026-02-18", category: "Văn Hóa", tags: ["văn-hóa", "vegan", "fine-dining"] },
  { title: "Không Gian Thiền Tịnh — Cảm Hứng Thiết Kế", excerpt: "Câu chuyện đằng sau thiết kế không gian mang phong cách Zen hiện đại.", content: "Chúng tôi tin rằng không gian ảnh hưởng trực tiếp đến trải nghiệm ẩm thực...\n\nMỗi góc nhỏ trong nhà hàng đều được tính toán để mang lại sự tĩnh tại...", author: "Đội ngũ thiết kế", publishedAt: "2026-03-01", category: "Không Gian", tags: ["không-gian", "vegan", "fine-dining"] },
  { title: "Câu Chuyện Về Củ Sen Đồng Tháp Mười", excerpt: "Hành trình của nguyên liệu chủ đạo trong nhiều món ăn signature.", content: "Đồng Tháp Mười — vùng đất của sen — cung cấp cho chúng tôi nguồn củ sen chất lượng cao...\n\nTừng lát sen trong món ăn đều mang theo câu chuyện của người nông dân...", author: "Đội ngũ Lotus & Earth", publishedAt: "2026-03-15", category: "Nguyên Liệu", tags: ["nguyên-liệu", "vegan", "fine-dining"] },
  { title: "Kỹ Thuật Umami Trong Ẩm Thực Thực Vật", excerpt: "Bí quyết tạo vị umami đậm đà mà không cần đến nguyên liệu động vật.", content: "Umami từng được xem là vị khó đạt được trong ẩm thực chay...\n\nBằng cách kết hợp nấm, rong biển kombu và lên men tự nhiên, chúng tôi tạo nên chiều sâu hương vị...", author: "Chef Trần Đức Anh", publishedAt: "2026-03-28", category: "Kỹ Thuật", tags: ["kỹ-thuật", "vegan", "fine-dining"] },
  { title: "Chef's Table — Trải Nghiệm Ẩm Thực Độc Bản", excerpt: "Giới thiệu trải nghiệm dùng bữa đặc biệt cùng đầu bếp trưởng.", content: "Chef's Table là trải nghiệm dành cho những thực khách muốn khám phá sâu hơn...\n\nQuý khách sẽ được thưởng thức thực đơn omakase độc quyền...", author: "Chef Lê Minh Quân", publishedAt: "2026-04-10", category: "Trải Nghiệm", tags: ["trải-nghiệm", "vegan", "fine-dining"] },
  { title: "Tráng Miệng Thuần Chay — Nghệ Thuật Cân Bằng Vị Ngọt", excerpt: "Cách chúng tôi tạo nên những món tráng miệng thuần chay tinh tế.", content: "Tráng miệng thuần chay đòi hỏi sự sáng tạo trong việc thay thế bơ sữa động vật...\n\nSữa hạnh nhân, agar và các loại đường tự nhiên là chìa khóa...", author: "Chef Nguyễn Thảo Vy", publishedAt: "2026-04-22", category: "Thực Đơn", tags: ["thực-đơn", "vegan", "fine-dining"] },
  { title: "Phát Triển Bền Vững Trong Ngành F&B", excerpt: "Cam kết của Lotus & Earth với môi trường và cộng đồng nông dân địa phương.", content: "Chúng tôi hướng đến mô hình zero-waste trong bếp...\n\nHợp tác trực tiếp với nông dân hữu cơ giúp giảm trung gian và hỗ trợ cộng đồng địa phương...", author: "Ban Giám Đốc", publishedAt: "2026-05-05", category: "Bền Vững", tags: ["bền-vững", "vegan", "fine-dining"] },
  { title: "Rượu Vang Hữu Cơ — Người Bạn Đồng Hành Hoàn Hảo", excerpt: "Danh sách rượu vang hữu cơ được tuyển chọn kỹ lưỡng cho thực đơn.", content: "Rượu vang hữu cơ được trồng không sử dụng thuốc trừ sâu hóa học...\n\nSommelier của chúng tôi lựa chọn từng chai rượu để đồng điệu cùng hương vị món ăn...", author: "Hoàng Bảo Trâm", publishedAt: "2026-05-18", category: "Văn Hóa", tags: ["văn-hóa", "vegan", "fine-dining"] },
  { title: "Đằng Sau Món Lẩu Nấm Thảo Mộc Signature", excerpt: "Quy trình chế biến công phu của món lẩu được yêu thích nhất.", content: "Nước dùng được hầm trong 8 giờ từ nấm và thảo mộc quý...\n\nMỗi nguyên liệu được thêm vào theo trình tự nghiêm ngặt để giữ trọn hương vị...", author: "Chef Bùi Ngọc Hân", publishedAt: "2026-06-01", category: "Kỹ Thuật", tags: ["kỹ-thuật", "vegan", "fine-dining"] },
  { title: "Không Gian Sự Kiện — Tổ Chức Tiệc Đẳng Cấp", excerpt: "Hướng dẫn tổ chức sự kiện riêng tư tại Lotus & Earth.", content: "Phòng sự kiện của chúng tôi phù hợp cho tiệc công ty, sinh nhật, kỷ niệm...\n\nĐội ngũ sẽ tư vấn thực đơn và trang trí phù hợp với chủ đề sự kiện...", author: "Đội ngũ Lotus & Earth", publishedAt: "2026-06-14", category: "Trải Nghiệm", tags: ["trải-nghiệm", "vegan", "fine-dining"] },
  { title: "Mùa Hè & Thực Đơn Giải Nhiệt Thanh Mát", excerpt: "Những món ăn và thức uống lý tưởng cho những ngày hè oi bức.", content: "Mùa hè là thời điểm lý tưởng cho các món salad tươi mát và nước ép detox...\n\nChúng tôi giới thiệu thực đơn giới hạn theo mùa với nguyên liệu giải nhiệt...", author: "Chef Đỗ Khánh Linh", publishedAt: "2026-06-25", category: "Thực Đơn", tags: ["thực-đơn", "vegan", "fine-dining"] },
  { title: "Giải Thưởng & Ghi Nhận — Hành Trình 5 Năm", excerpt: "Nhìn lại chặng đường phát triển và những giải thưởng Lotus & Earth đạt được.", content: "Từ những ngày đầu khởi nghiệp, chúng tôi luôn kiên định với triết lý ẩm thực bền vững...\n\nNăm năm qua, Lotus & Earth vinh dự nhận nhiều ghi nhận từ giới chuyên môn...", author: "Ban Giám Đốc", publishedAt: "2026-07-01", category: "Thương Hiệu", tags: ["thương-hiệu", "vegan", "fine-dining"] },
];

function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(3, Math.round(words / 150));
}

export const blogPosts: BlogPost[] = RAW.map((p, i) => ({
  ...p,
  id: `blog-${String(i + 1).padStart(3, "0")}`,
  slug: slugify(p.title),
  coverImage: `/images/blog/blog-${String(i + 1).padStart(2, "0")}.jpg`,
  readingTime: estimateReadingTime(p.content),
}));

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3) {
  return blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, limit)
    .concat(
      blogPosts.filter((p) => p.id !== post.id && p.category !== post.category)
    )
    .slice(0, limit);
}
