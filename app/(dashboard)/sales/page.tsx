'use client';

import React, { useState } from 'react';
import {
  Star,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  PlusSquare,
  Syringe,
  Pill,
  Stethoscope,
  LucideIcon,
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  type: string;
  unit: string;
  price: number;
  status: 'Còn hàng' | 'Sắp hết' | 'Hết hàng';
  icon: LucideIcon;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Amoxicillin 500mg',
    type: 'Viên nang',
    unit: '20 Đơn vị',
    price: 24.5,
    status: 'Còn hàng',
    icon: PlusSquare,
  },
  {
    id: 2,
    name: 'Lisinopril 10mg',
    type: 'Viên nén',
    unit: '30 Đơn vị',
    price: 18.2,
    status: 'Còn hàng',
    icon: Pill,
  },
  {
    id: 3,
    name: 'Insulin Glargine',
    type: 'Tiêm',
    unit: '10ml',
    price: 89.0,
    status: 'Sắp hết',
    icon: Syringe,
  },
  {
    id: 4,
    name: 'Metformin 850mg',
    type: 'Viên nén',
    unit: '100 Đơn vị',
    price: 12.4,
    status: 'Còn hàng',
    icon: Pill,
  },
  {
    id: 5,
    name: 'Albuterol HFA',
    type: 'Ống hít',
    unit: '8.5g',
    price: 35.0,
    status: 'Còn hàng',
    icon: Stethoscope,
  },
  {
    id: 6,
    name: 'Atorvastatin 20mg',
    type: 'Viên nén',
    unit: '90 Đơn vị',
    price: 45.6,
    status: 'Còn hàng',
    icon: Pill,
  },
];

export default function SalesPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.045;
  const total = subtotal + tax;

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-auto lg:h-[calc(100vh-140px)] overflow-y-auto lg:overflow-hidden animate-fade-in custom-scrollbar">
      {/* Left Section - Product Selection */}
      <div className="flex-1 flex flex-col gap-6 md:gap-8 min-w-0">
        {/* Quick Select Section */}
        <div className="flex-1 flex flex-col gap-4 md:gap-8 min-h-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 md:w-6 md:h-6 text-blue-600 fill-blue-600" />
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                Chọn nhanh sản phẩm
              </h2>
            </div>
            <div className="flex bg-slate-100/50 p-1 rounded-xl gap-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {['Giảm đau', 'Kháng sinh', 'Tiểu đường'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 md:px-4 py-1.5 rounded-lg text-[12px] md:text-[13px] font-bold transition-all ${activeFilter === filter ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-y-auto pr-2 pb-6 custom-scrollbar lg:h-full">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-white p-5 md:p-6 rounded-3xl md:rounded-4xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all text-left group"
              >
                <div className="flex justify-between items-start mb-4 md:mb-6">
                  <div className="p-2.5 md:p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <product.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <span
                    className={`text-[9px] md:text-[10px] font-black px-2 py-1 md:px-2.5 md:py-1 rounded-lg uppercase tracking-wider ${
                      product.status === 'Còn hàng'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
                <h4 className="text-[15px] md:text-[17px] font-black text-slate-800 leading-tight group-hover:text-blue-600 transition-colors truncate">
                  {product.name}
                </h4>
                <p className="text-slate-400 text-[12px] md:text-[13px] font-medium mt-1">
                  {product.type} • {product.unit}
                </p>
                <p className="text-lg md:text-xl font-black text-slate-900 mt-4 md:mt-5">
                  ${product.price.toFixed(2)}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section - Current Order Sidebar */}
      <div
        className="w-full lg:w-[480px] h-[600px] lg:h-full bg-white rounded-3xl md:rounded-5xl border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col overflow-hidden animate-slide-up shrink-0"
        style={{ animationDelay: '0.2s' }}
      >
        <div className="p-6 md:p-8 border-b border-slate-50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg md:text-xl font-black text-slate-900">
              Đơn hàng hiện tại
            </h3>
            <button
              onClick={() => setCart([])}
              className="p-2 md:p-2.5 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
            >
              <Trash2 className="w-4.5 h-4.5 md:w-5 md:h-5" />
            </button>
          </div>
          <p className="text-[12px] md:text-[13px] font-bold text-slate-400 tracking-wide">
            Mã giao dịch: #PX-99281
          </p>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4 md:space-y-6 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <PlusSquare className="w-16 h-16 md:w-20 md:h-20 text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold text-sm md:text-base">
                Chưa có sản phẩm nào
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 md:gap-4 p-4 md:p-5 bg-slate-50/50 rounded-2xl md:rounded-3xl border border-slate-100 group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl border border-slate-100 flex items-center justify-center text-blue-600 shrink-0">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h5 className="text-[13px] md:text-[15px] font-black text-slate-800 truncate pr-2">
                      {item.name}
                    </h5>
                    <p className="text-[14px] md:text-[16px] font-black text-slate-900 whitespace-nowrap">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <p className="text-[11px] md:text-[12px] font-bold text-slate-400 mt-0.5">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center justify-between mt-3 md:mt-4">
                    <div className="flex items-center bg-white border border-slate-200 rounded-lg md:rounded-xl overflow-hidden shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 md:p-1.5 hover:bg-slate-50 text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </button>
                      <span className="w-8 md:w-10 text-center text-[12px] md:text-sm font-black text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 md:p-1.5 hover:bg-slate-50 text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[11px] font-bold text-rose-500 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary & Checkout */}
        <div className="p-6 md:p-8 bg-slate-50/80 backdrop-blur-md border-t border-slate-100 space-y-4 md:space-y-6">
          <div className="space-y-2 md:space-y-3">
            <div className="flex justify-between text-[13px] md:text-[15px] font-bold text-slate-500 px-1">
              <span>Tạm tính</span>
              <span className="text-slate-800 tabular-nums">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-[13px] md:text-[15px] font-bold text-slate-500 px-1">
              <span>Thuế (4.5%)</span>
              <span className="text-slate-800 tabular-nums">
                ${tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center px-1 pt-2 md:pt-3 border-t border-slate-200">
              <span className="text-base md:text-lg font-black text-slate-900">
                Tổng cộng
              </span>
              <span className="text-2xl md:text-3xl font-black text-blue-600 tabular-nums">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-4 md:py-5 bg-[#0061d5] hover:bg-blue-700 text-white font-black text-base md:text-lg rounded-[20px] md:rounded-4xl shadow-xl shadow-blue-500/30 transition-all transform active:scale-[0.98] group">
            Hoàn tất thanh toán
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
