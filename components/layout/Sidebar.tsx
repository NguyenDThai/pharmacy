'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  History,
  PlusCircle,
  Settings,
  PlusSquare,
  X,
  LogOut,
  LogIn,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from '@/redux/api/authApi';
import { logout } from '@/redux/slides/authSlice';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Bảng điều khiển', href: '/' },
  { icon: Package, label: 'Kho hàng', href: '/inventory' },
  { icon: ShoppingCart, label: 'Bán hàng', href: '/sales' },
  { icon: History, label: 'Lịch sử đơn hàng', href: '/history' },
];

const sidebarItems = [{ icon: Settings, label: 'Cài đặt', href: '/settings' }];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { user } = useSelector((state: RootState) => state.auth);
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());

      onClose();
    } catch (error) {
      console.error('Lỗi đăng xuất:', error);
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={`w-72 bg-[#f8fafc] border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 overflow-y-auto z-[70] transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Logo & Close button */}
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0061d5] rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
              <PlusSquare className="text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 leading-tight">
                Thuốc Tây
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                QUẢN LÝ NHÀ THUỐC
              </p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()} // Close sidebar when clicking a link on mobile
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <item.icon
                  className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`}
                />
                <span
                  className={`text-[15px] font-bold ${isActive ? 'text-slate-900' : ''}`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-6 bg-blue-600 rounded-full animate-in fade-in slide-in-from-right-1 duration-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 space-y-4 border-t border-slate-100">
          <button className="w-full flex items-center justify-center gap-3 py-4 bg-[#0061d5] hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95 group">
            <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span>Đơn thuốc mới</span>
          </button>

          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors group"
              >
                <item.icon className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                <span className="text-[14px] font-bold">{item.label}</span>
              </Link>
            ))}

            {user ? (
              <button
                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors group cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut />
                <span className="text-[14px] font-bold">Đăng xuất</span>
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => onClose()}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors group cursor-pointer"
              >
                <LogIn />
                <span className="text-[14px] font-bold">Đăng nhập</span>
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
