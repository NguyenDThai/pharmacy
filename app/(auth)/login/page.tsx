"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  PlusSquare,
  Check,
} from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from),_transparent_px),_radial-gradient(circle_at_bottom_left,_var(--tw-gradient-to),_transparent_px)] from-blue-50 via-white to-blue-100/50 p-4 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-10 animate-fade-in opacity-0">
        <div className="w-16 h-16 bg-[#0061d5] rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200 mb-6 transform hover:rotate-3 transition-transform duration-500">
          <PlusSquare className="text-white w-10 h-10" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-2">
          Cửa hàng thuốc tây
        </h1>
        <p className="text-slate-500 text-sm font-semibold tracking-[0.2em] uppercase">
          Trí tuệ Lâm sàng Chính xác
        </p>
      </div>

      {/* Login Card */}
      <div
        className="w-full max-w-[500px] bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 p-12 animate-zoom-in opacity-0"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Chào mừng quay trở lại
          </h2>
          <p className="text-slate-500 text-[16px] leading-relaxed max-w-[340px] mx-auto">
            Vui lòng nhập thông tin xác thực để truy cập không gian làm việc
            dược phẩm.
          </p>
        </div>

        <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
          {/* Username Input */}
          <div className="space-y-3">
            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              TÊN ĐĂNG NHẬP HOẶC EMAIL
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="VD: duocsi_quantri"
                className="block w-full pl-14 pr-5 py-5 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all duration-300"
              />
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
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="block w-full pl-14 pr-14 py-5 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-blue-500 transition-colors duration-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className="flex items-center group cursor-pointer select-none"
            >
              <div
                className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-300 ${rememberMe ? "bg-blue-600 border-blue-600 shadow-lg shadow-blue-100" : "bg-slate-50 border-slate-200 group-hover:border-blue-400 group-hover:bg-blue-50/30"}`}
              >
                {rememberMe && (
                  <Check className="w-4 h-4 text-white stroke-4" />
                )}
              </div>
              <span className="ml-3 text-[15px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                Ghi nhớ tôi
              </span>
            </button>
            <Link
              href="/forgot-password"
              className="text-[15px] font-bold text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 transition-all"
            >
              Quên mật khẩu?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center py-5 px-8 rounded-2xl bg-[#0061d5] hover:bg-blue-700 text-white font-bold text-lg shadow-[0_12px_24px_-8px_rgba(0,97,213,0.4)] hover:shadow-[0_20px_40px_-12px_rgba(0,97,213,0.5)] transform active:scale-[0.97] transition-all duration-300 group"
          >
            Đăng nhập
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-12 text-center pt-8 border-t border-slate-50">
          <p className="text-[15px] text-slate-500">
            Mới sử dụng Apothecary OS?{" "}
            <Link
              href="/request-access"
              className="font-bold text-blue-600 hover:text-blue-700 transition-colors border-b-2 border-transparent hover:border-blue-600 ml-1"
            >
              Yêu cầu quyền truy cập
            </Link>
          </p>
        </div>
      </div>

      {/* Security Badges */}
      <div
        className="flex flex-wrap items-center justify-center gap-4 mt-16 animate-slide-up opacity-0"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="flex items-center gap-2.5 px-6 py-3 bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-default">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span className="text-[11px] font-black text-slate-600 tracking-[0.15em]">
            TUÂN THỦ HIPAA
          </span>
        </div>
        <div className="flex items-center gap-2.5 px-6 py-3 bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-default">
          <ShieldCheck className="w-5 h-5 text-indigo-500" />
          <span className="text-[11px] font-black text-slate-600 tracking-[0.15em]">
            MÃ HÓA AES-256 BIT
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto pt-16 pb-12 w-full max-w-7xl px-8 flex flex-col lg:flex-row items-center justify-between text-[13px] text-slate-400 font-semibold tracking-wide border-t border-slate-100/50">
        <div className="mb-6 lg:mb-0 opacity-70">
          © {new Date().getFullYear()} Digital Apothecary Framework. Bảo lưu mọi
          quyền.
        </div>
        <div className="flex items-center gap-8">
          <Link
            href="/privacy"
            className="hover:text-blue-600 transition-colors"
          >
            Chính sách bảo mật
          </Link>
          <Link href="/terms" className="hover:text-blue-600 transition-colors">
            Điều khoản dịch vụ
          </Link>
          <Link
            href="/security"
            className="hover:text-blue-600 transition-colors"
          >
            Tiêu chuẩn an ninh
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Login;
