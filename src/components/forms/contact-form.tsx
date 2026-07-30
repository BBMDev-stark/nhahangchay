"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên"),
  email: z.string().email("Email không hợp lệ"),
  subject: z.string().min(2, "Vui lòng nhập chủ đề"),
  message: z.string().min(10, "Nội dung cần tối thiểu 10 ký tự"),
});
type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full border-b border-border bg-transparent py-3 text-sm text-text placeholder:text-text/40 focus:border-gold focus:outline-none transition-colors";
const labelClass = "text-xs font-medium uppercase tracking-wider text-text/60";

export function ContactForm() {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 700));
    setSuccess(true);
    reset();
    setTimeout(() => setSuccess(false), 4000);
  }

  if (success) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-lg border border-green-primary/20 bg-green-primary/5 p-8">
        <CheckCircle2 className="text-green-primary" size={32} />
        <p className="text-text/70">Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div>
        <label className={labelClass}>Họ Và Tên</label>
        <input {...register("name")} className={inputClass} />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Email</label>
        <input {...register("email")} type="email" className={inputClass} />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Chủ Đề</label>
        <input {...register("subject")} className={inputClass} />
        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Nội Dung</label>
        <textarea
          {...register("message")}
          rows={4}
          className={cn(inputClass, "resize-none")}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Đang Gửi..." : "Gửi Tin Nhắn"}
      </Button>
    </form>
  );
}
