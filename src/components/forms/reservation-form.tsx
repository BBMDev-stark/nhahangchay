"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import {
  reservationSchema,
  type ReservationFormValues,
} from "@/features/reservation/validation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { z } from "zod";

type ReservationFormInput = z.input<typeof reservationSchema>;

const inputClass =
  "w-full border-b border-border bg-transparent py-3 text-sm text-text placeholder:text-text/40 focus:border-gold focus:outline-none transition-colors";
const labelClass = "text-xs font-medium uppercase tracking-wider text-text/60";

export function ReservationForm() {
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormInput>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { guests: 2 },
  });

  async function onSubmit(raw: ReservationFormInput) {
    const data = raw as unknown as ReservationFormValues;
    setSubmitError(null);

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Reservation request failed");
      setSuccess(true);
      reset();
    } catch {
      setSubmitError(
        "Không thể gửi yêu cầu đặt bàn lúc này. Vui lòng thử lại hoặc gọi trực tiếp cho nhà hàng."
      );
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 rounded-lg border border-green-primary/20 bg-green-primary/5 px-8 py-16 text-center"
      >
        <CheckCircle2 className="text-green-primary" size={40} />
        <h3 className="font-heading text-2xl text-text">Đặt Bàn Thành Công</h3>
        <p className="max-w-sm text-sm text-text/60">
          Cảm ơn bạn đã đặt bàn tại Lotus &amp; Earth. Chúng tôi sẽ liên hệ xác nhận trong vòng 30 phút.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSuccess(false)}>
          Đặt Thêm Lượt Khác
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <label className={labelClass}>Họ Và Tên</label>
        <input {...register("name")} className={inputClass} placeholder="Nguyễn Văn A" />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Số Điện Thoại</label>
        <input {...register("phone")} className={inputClass} placeholder="0901 234 567" />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Email</label>
        <input {...register("email")} type="email" className={inputClass} placeholder="ban@email.com" />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Số Lượng Khách</label>
        <input {...register("guests")} type="number" min={1} max={20} className={inputClass} />
        {errors.guests && <p className="mt-1 text-xs text-red-500">{errors.guests.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Ngày</label>
        <input {...register("date")} type="date" className={inputClass} />
        {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Giờ</label>
        <input {...register("time")} type="time" className={inputClass} />
        {errors.time && <p className="mt-1 text-xs text-red-500">{errors.time.message}</p>}
      </div>
      <div className="md:col-span-2">
        <label className={labelClass}>Yêu Cầu Đặc Biệt</label>
        <textarea
          {...register("specialRequest")}
          rows={3}
          className={cn(inputClass, "resize-none")}
          placeholder="Dị ứng thực phẩm, tổ chức sinh nhật, chỗ ngồi mong muốn..."
        />
      </div>
      <div className="md:col-span-2">
        {submitError && (
          <p role="alert" className="mb-4 text-sm text-red-500">
            {submitError}
          </p>
        )}
        <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
          {isSubmitting ? "Đang Gửi..." : "Xác Nhận Đặt Bàn"}
        </Button>
      </div>
    </form>
  );
}
