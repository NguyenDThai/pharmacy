import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Kết nối Database
    await connectDB();

    // Lấy dữ liệu từ client
    const { name, email, password } = await req.json();

    // 1. Kiểm tra inputs
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Họ tên, email và mật khẩu là bắt buộc' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Mật khẩu phải dài ít nhất 6 ký tự' },
        { status: 400 }
      );
    }

    // 2. Kiểm tra email đã tồn tại hay chưa
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: 'Email này đã tồn tại trên hệ thống' },
        { status: 400 }
      );
    }

    // 3. Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Tạo User mới
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: 'Tạo tài khoản thành công!',
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: 'Lỗi hệ thống. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
