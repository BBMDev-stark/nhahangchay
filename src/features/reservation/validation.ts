import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên đầy đủ"),
  phone: z
    .string()
    .regex(/^(0|\+84)[0-9]{9,10}$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  date: z.string().min(1, "Vui lòng chọn ngày"),
  time: z.string().min(1, "Vui lòng chọn giờ"),
  guests: z.coerce
    .number()
    .min(1, "Tối thiểu 1 khách")
    .max(20, "Vui lòng liên hệ trực tiếp cho nhóm trên 20 khách"),
  specialRequest: z.string().max(500).optional(),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;
