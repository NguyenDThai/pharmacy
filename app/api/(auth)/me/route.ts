import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    // Lấy token từ cookie
    const cookieStore = cookies();
    const token = (await cookieStore).get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Chưa đăng nhập' }, { status: 401 });
    }

    // xác thực JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    // Tìm thông tin của user trong DB
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return NextResponse.json(
        { message: 'Người dùng không tồn tại' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch {
    return NextResponse.json(
      { message: 'Token không hợp lệ hoặc hết hạn' },
      { status: 401 }
    );
  }
}
