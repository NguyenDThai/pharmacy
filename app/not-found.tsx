"use client";

import React from "react";
import Link from "next/link";
import {
  FileQuestion,
  ArrowLeft,
  Search,
  PlusSquare,
  Home,
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from),_transparent_px),_radial-gradient(circle_at_bottom_left,_var(--tw-gradient-to),_transparent_px)] from-slate-50 via-white to-blue-50/30 p-4 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-400/5 rounded-full blur-[120px] -z-10" />

      {/* Header Section */}
      <div className="flex flex-col items-center mb-12 animate-fade-in opacity-0">
        <div className="w-16 h-16 bg-[#0061d5] rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200 mb-6 transform hover:rotate-[-10deg] transition-transform duration-500">
          <PlusSquare className="text-white w-10 h-10" />
        </div>
        <h1 className="text-xl font-black text-slate-800 tracking-[0.2em] uppercase">
          Cửa hàng thuốc tây
        </h1>
      </div>

      {/* Main Content Card */}
      <div
        className="w-full max-w-[540px] bg-white/70 backdrop-blur-xl rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-white p-12 text-center animate-zoom-in opacity-0"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="relative mb-10 inline-block">
          <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto ring-8 ring-slate-50/50">
            <span className="text-6xl font-black text-slate-200">404</span>
          </div>
          <div className="absolute -top-2 -right-2 bg-white rounded-full p-3 shadow-lg border border-slate-50">
            <FileQuestion className="w-6 h-6 text-[#0061d5]" />
          </div>
        </div>

        <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">
          Trang không tồn tại
        </h2>

        <div className="space-y-4 mb-10">
          <p className="text-xl font-bold text-slate-700">
            Chức năng này chưa được triển khai
          </p>
          <p className="text-slate-500 leading-relaxed font-medium mx-auto max-w-[380px]">
            Đường dẫn bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển
            sang một kho lưu trữ khác.
          </p>
        </div>

        <div className="relative group max-w-sm mx-auto mb-10">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4.5 w-4.5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm chức năng khác..."
            className="block w-full pl-11 pr-4 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all duration-200 text-sm"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-3 py-4 px-10 bg-[#0061d5] hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 group"
          >
            <Home className="w-5 h-5" />
            Về trang chủ
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-3 py-4 px-10 bg-white hover:bg-slate-50 text-slate-700 font-black rounded-2xl transition-all border border-slate-200 active:scale-95 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Quay lại
          </button>
        </div>
      </div>

      <footer className="mt-auto pt-16 pb-12 text-[12px] font-black text-slate-300 tracking-[0.1em] uppercase">
        Digital Apothecary Navigator • System Code: ERR_NOT_FOUND
      </footer>
    </div>
  );
}
