import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();

  (await cookieStore).delete("token");

  return NextResponse.json({ message: "Đăng xuất thành công" });
}
