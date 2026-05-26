'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  PlusSquare,
  BadgeCheck,
} from 'lucide-react';
import { useRegisterMutation } from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();

  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error('Mật khẩu xác nhận không khớp!');
    }

    try {
      await register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      toast.success('Đăng ký thành công!');
      router.push('/login');
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || 'Đăng ký thất bại!');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from),_transparent_px),_radial-gradient(circle_at_bottom_left,_var(--tw-gradient-to),_transparent_px)] from-blue-50 via-white to-blue-100/50 p-4 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-10 animate-fade-in">
        <div className="w-16 h-16 bg-[#0061d5] rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200 mb-6 transform hover:rotate-3 transition-transform duration-500">
          <PlusSquare className="text-white w-10 h-10" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-2">
          Thuốc Tây OS
        </h1>
        <p className="text-slate-500 text-sm font-semibold tracking-[0.2em] uppercase">
          Khởi tạo tài khoản hệ thống
        </p>
      </div>

      {/* Register Card */}
      <div
        className="w-full max-w-[550px] bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 p-8 md:p-12 animate-zoom-in"
        style={{ animationDelay: '0.2s' }}
      >
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Đăng ký tài khoản
          </h2>
          <p className="text-slate-500 text-[16px] leading-relaxed max-w-[360px] mx-auto">
            Tham gia mạng lưới dược phẩm kỹ thuật số để quản lý nhà thuốc chuyên
            nghiệp hơn.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name Input */}
            <div className="space-y-3">
              <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                HỌ VÀ TÊN
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Nguyễn Văn A"
                  className="block w-full pl-14 pr-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all duration-300"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-3">
              <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                EMAIL CƠ QUAN
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@pharmacy.vn"
                  className="block w-full pl-14 pr-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-3">
            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              MẬT KHẨU
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="block w-full pl-14 pr-14 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-blue-500 transition-colors duration-300"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-3">
            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              XÁC NHẬN MẬT KHẨU
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <ShieldCheck className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="block w-full pl-14 pr-14 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-blue-500 transition-colors duration-300"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Terms Agreement */}
          <p className="text-[13px] text-slate-500 leading-relaxed px-1">
            Bằng cách tiếp tục, bạn đồng ý với{' '}
            <Link
              href="/terms"
              className="text-blue-600 font-bold hover:underline"
            >
              Điều khoản dịch vụ
            </Link>{' '}
            và{' '}
            <Link
              href="/privacy"
              className="text-blue-600 font-bold hover:underline"
            >
              Chính sách bảo mật
            </Link>{' '}
            của chúng tôi.
          </p>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center py-5 px-8 rounded-2xl bg-[#0061d5] hover:bg-blue-700 text-white font-bold text-lg shadow-[0_12px_24px_-8px_rgba(0,97,213,0.4)] hover:shadow-[0_20px_40px_-12px_rgba(0,97,213,0.5)] transform active:scale-[0.97] transition-all duration-300 group mt-4 h-[68px] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Đang khởi tạo tài khoản...' : 'Tạo tài khoản ngay'}
            {!isLoading && (
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-10 text-center pt-8 border-t border-slate-50">
          <p className="text-[15px] text-slate-500">
            Đã có tài khoản hệ thống?{' '}
            <Link
              href="/login"
              className="font-bold text-blue-600 hover:text-blue-700 transition-colors border-b-2 border-transparent hover:border-blue-600 ml-1"
            >
              Đăng nhập tại đây
            </Link>
          </p>
        </div>
      </div>

      {/* Security Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-12 animate-slide-up">
        <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
          <BadgeCheck className="w-6 h-6 text-emerald-500" />
          <span className="text-[10px] font-black text-slate-600 tracking-[0.2em] uppercase">
            Data Integrity Verified
          </span>
        </div>
        <div className="w-px h-4 bg-slate-300 hidden md:block" />
        <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
          <ShieldCheck className="w-6 h-6 text-indigo-500" />
          <span className="text-[10px] font-black text-slate-600 tracking-[0.2em] uppercase">
            Military-Grade Security
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
