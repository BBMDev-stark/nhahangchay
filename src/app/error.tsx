"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="text-eyebrow">Đã Có Lỗi Xảy Ra</span>
      <h1 className="text-h1 font-heading text-text">Rất Tiếc, Có Gì Đó Không Ổn</h1>
      <p className="max-w-md text-text/60">
        Vui lòng thử lại hoặc quay về trang chủ. Nếu vấn đề tiếp diễn, hãy liên hệ với chúng tôi.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>Thử Lại</Button>
        <Link href="/">
          <Button variant="outline">Về Trang Chủ</Button>
        </Link>
      </div>
    </div>
  );
}
