"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Check } from "lucide-react";

const schema = z.object({
  email: z.string().email("Vui lòng nhập email hợp lệ"),
});
type FormData = z.infer<typeof schema>;

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
      <div>
        <h4 className="font-heading text-xl text-white">Nhận Ưu Đãi Độc Quyền</h4>
        <p className="mt-1 text-sm text-white/50">
          Đăng ký để cập nhật thực đơn theo mùa và ưu đãi mới nhất.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <div className="flex items-center border-b border-white/30 focus-within:border-gold">
          <input
            {...register("email")}
            type="email"
            placeholder="Email của bạn"
            className="w-full bg-transparent py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            aria-label="Đăng ký"
            className="text-gold transition hover:opacity-70"
          >
            {submitted ? <Check size={18} /> : <Send size={18} />}
          </button>
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
        )}
      </form>
    </div>
  );
}
