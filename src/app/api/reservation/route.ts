import { NextResponse } from "next/server";
import { reservationSchema } from "@/features/reservation/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = reservationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten() },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}
