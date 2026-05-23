import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    // 1. Kiểm tra đầu vào
    if (!email || !password) {
      return NextResponse.json(
        { message: "Vui lòng nhập email và mật khẩu" },
        { status: 400 },
      );
    }

    // 2. Tìm người dùng (phải dùng .select("+password") vì trong model để select: false)
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json(
        { message: "Email hoặc mật khẩu không chính xác" },
        { status: 401 },
      );
    }

    // 3. So khớp mật khẩu
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Email hoặc mật khẩu không chính xác" },
        { status: 401 },
      );
    }

    // 4. Tạo JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );

    // 5. Trả về thông tin đăng nhập thành công
    const response = NextResponse.json(
      {
        message: "Đăng nhập thành công",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      },
      { status: 200 },
    );

    // Có thể set cookie ở đây nếu muốn
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 ngày
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Lỗi đăng nhập:", error);
    return NextResponse.json(
      { message: "Lỗi hệ thống, vui lòng thử lại sau" },
      { status: 500 },
    );
  }
}
