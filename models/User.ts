import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng nhập họ và tên'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Vui lòng nhập email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Vui lòng nhập email hợp lệ',
      ],
    },
    password: {
      type: String,
      required: [true, 'Vui lòng nhập mật khẩu'],
      minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự'],
      select: false, // Không trả về password trừ khi được yêu cầu cụ thể
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

// Kiểm tra xem model đã tồn tại chưa (tránh lỗi OverwriteModelError trong Next.js)
const User = models.User || model('User', UserSchema);

export default User;
