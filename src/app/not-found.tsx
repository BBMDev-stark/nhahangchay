import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="font-heading text-8xl text-gold">404</span>
      <h1 className="text-h1 font-heading text-text">Trang Không Tồn Tại</h1>
      <p className="max-w-md text-text/60">
        Có vẻ như trang bạn tìm kiếm không còn tồn tại hoặc đã được di chuyển.
      </p>
      <Link href="/">
        <Button>Về Trang Chủ</Button>
      </Link>
    </div>
  );
}
