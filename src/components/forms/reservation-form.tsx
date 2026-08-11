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
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 rounded-lg border border-green-primary/20 bg-green-primary/5 px-8 py-16 text-center"
      >
        <CheckCircle2 className="text-green-primary" size={40} />
        <h3 className="font-heading text-2xl text-text">Đặt Bàn Thành Công</h3>
        <p className="max-w-sm text-sm text-text/60">
          Cảm ơn bạn đã gửi yêu cầu đặt bàn tại Hương Sen. Nhà hàng sẽ liên hệ để xác nhận trong thời gian sớm nhất.
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
        <label htmlFor="reservation-name" className={labelClass}>Họ Và Tên</label>
        <input
          {...register("name")}
          id="reservation-name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "reservation-name-error" : undefined}
          className={inputClass}
          placeholder="Nguyễn Văn A"
        />
        {errors.name && <p id="reservation-name-error" className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="reservation-phone" className={labelClass}>Số Điện Thoại</label>
        <input
          {...register("phone")}
          id="reservation-phone"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "reservation-phone-error" : undefined}
          className={inputClass}
          placeholder="0901 234 567"
        />
        {errors.phone && <p id="reservation-phone-error" className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
      </div>
      <div>
        <label htmlFor="reservation-email" className={labelClass}>Email</label>
        <input
          {...register("email")}
          id="reservation-email"
          type="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "reservation-email-error" : undefined}
          className={inputClass}
          placeholder="ban@email.com"
        />
        {errors.email && <p id="reservation-email-error" className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="reservation-guests" className={labelClass}>Số Lượng Khách</label>
        <input
          {...register("guests")}
          id="reservation-guests"
          type="number"
          min={1}
          max={20}
          aria-invalid={Boolean(errors.guests)}
          aria-describedby={errors.guests ? "reservation-guests-error" : undefined}
          className={inputClass}
        />
        {errors.guests && <p id="reservation-guests-error" className="mt-1 text-xs text-red-500">{errors.guests.message}</p>}
      </div>
      <div>
        <label htmlFor="reservation-date" className={labelClass}>Ngày</label>
        <input
          {...register("date")}
          id="reservation-date"
          type="date"
          aria-invalid={Boolean(errors.date)}
          aria-describedby={errors.date ? "reservation-date-error" : undefined}
          className={inputClass}
        />
        {errors.date && <p id="reservation-date-error" className="mt-1 text-xs text-red-500">{errors.date.message}</p>}
      </div>
      <div>
        <label htmlFor="reservation-time" className={labelClass}>Giờ</label>
        <input
          {...register("time")}
          id="reservation-time"
          type="time"
          aria-invalid={Boolean(errors.time)}
          aria-describedby={errors.time ? "reservation-time-error" : undefined}
          className={inputClass}
        />
        {errors.time && <p id="reservation-time-error" className="mt-1 text-xs text-red-500">{errors.time.message}</p>}
      </div>
      <div className="md:col-span-2">
        <label htmlFor="reservation-special-request" className={labelClass}>Yêu Cầu Đặc Biệt</label>
        <textarea
          {...register("specialRequest")}
          id="reservation-special-request"
          rows={3}
          aria-invalid={Boolean(errors.specialRequest)}
          aria-describedby={errors.specialRequest ? "reservation-special-request-error" : undefined}
          className={cn(inputClass, "resize-none")}
          placeholder="Dị ứng thực phẩm, tổ chức sinh nhật, chỗ ngồi mong muốn..."
        />
        {errors.specialRequest && (
          <p id="reservation-special-request-error" className="mt-1 text-xs text-red-500">
            {errors.specialRequest.message}
          </p>
        )}
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
