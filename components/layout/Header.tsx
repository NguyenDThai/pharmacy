"use client";

import React from "react";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 md:px-10 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Bar */}
        <div className="relative w-full max-w-xl hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-4.5 w-4.5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm thuốc, bệnh nhân, hóa đơn..."
            className="w-full bg-[#f1f5f9] border-none rounded-2xl py-3 pl-14 pr-5 focus:ring-2 focus:ring-blue-500/10 focus:bg-white text-slate-700 placeholder:text-slate-400 placeholder:font-medium transition-all text-sm"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative cursor-pointer group">
          <Bell className="w-5.5 h-5.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </div>

        <div className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-50 transition-colors cursor-pointer group">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aris"
            alt="Doctor Avatar"
            className="w-10 h-10 rounded-xl bg-slate-100 object-cover"
          />
          <div className="hidden sm:block">
            {isLoading ? (
              <div className="space-y-1.5">
                <div className="h-4 w-20 bg-slate-200 animate-pulse rounded-md" />
              </div>
            ) : (
              <p className="text-sm font-bold text-slate-800">{user?.name}</p>
            )}
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
        </div>
      </div>
    </header>
  );
}
