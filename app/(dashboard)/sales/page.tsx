"use client";

import React, { useState } from "react";
import {
  ScanLine,
  Star,
  Minus,
  Plus,
  Trash2,
  Banknote,
  CreditCard,
  ArrowRight,
  Search,
  PlusSquare,
  Syringe,
  Pill,
  Thermometer,
  Stethoscope,
  Scan,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  type: string;
  unit: string;
  price: number;
  status: "Còn hàng" | "Sắp hết" | "Hết hàng";
  icon: any;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Amoxicillin 500mg",
    type: "Viên nang",
    unit: "20 Đơn vị",
    price: 24.5,
    status: "Còn hàng",
    icon: PlusSquare,
  },
  {
    id: 2,
    name: "Lisinopril 10mg",
    type: "Viên nén",
    unit: "30 Đơn vị",
    price: 18.2,
    status: "Còn hàng",
    icon: Pill,
  },
  {
    id: 3,
    name: "Insulin Glargine",
    type: "Tiêm",
    unit: "10ml",
    price: 89.0,
    status: "Sắp hết",
    icon: Syringe,
  },
  {
    id: 4,
    name: "Metformin 850mg",
    type: "Viên nén",
    unit: "100 Đơn vị",
    price: 12.4,
    status: "Còn hàng",
    icon: Pill,
  },
  {
    id: 5,
    name: "Albuterol HFA",
    type: "Ống hít",
    unit: "8.5g",
    price: 35.0,
    status: "Còn hàng",
    icon: Stethoscope,
  },
  {
    id: 6,
    name: "Atorvastatin 20mg",
    type: "Viên nén",
    unit: "90 Đơn vị",
    price: 45.6,
    status: "Còn hàng",
    icon: Pill,
  },
];

export default function SalesPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
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
      }),
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.045;
  const total = subtotal + tax;

  return (
    <div className="flex gap-8 h-[calc(100vh-140px)] animate-fade-in">
      {/* Left Section - Product Selection */}
      <div className="flex-1 flex flex-col gap-8 min-w-0">
        {/* Quick Select Section */}
        <div className="flex-1 flex flex-col gap-8 min-h-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-blue-600 fill-blue-600" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Chọn nhanh sản phẩm
              </h2>
            </div>
            <div className="flex bg-slate-100/50 p-1 rounded-xl gap-1">
              {["Giảm đau", "Kháng sinh", "Tiểu đường"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-lg text-[13px] font-bold transition-all ${activeFilter === filter ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 pb-6 custom-scrollbar">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all text-left group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <product.icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                      product.status === "Còn hàng"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
                <h4 className="text-[17px] font-black text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h4>
                <p className="text-slate-400 text-[13px] font-medium mt-1">
                  {product.type} • {product.unit}
                </p>
                <p className="text-xl font-black text-slate-900 mt-5">
                  ${product.price.toFixed(2)}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section - Current Order Sidebar */}
      <div
        className="w-[480px] bg-white rounded-5xl border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col overflow-hidden animate-slide-up"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="p-8 border-b border-slate-50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-black text-slate-900">
              Đơn hàng hiện tại
            </h3>
            <button
              onClick={() => setCart([])}
              className="p-2.5 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[13px] font-bold text-slate-400 tracking-wide">
            Mã giao dịch: #PX-99281
          </p>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <PlusSquare className="w-20 h-20 text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold">Chưa có sản phẩm nào</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-5 bg-slate-50/50 rounded-3xl border border-slate-100 group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-blue-600">
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h5 className="text-[15px] font-black text-slate-800 truncate pr-2">
                      {item.name}
                    </h5>
                    <p className="text-[16px] font-black text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <p className="text-[12px] font-bold text-slate-400 mt-0.5">
                    Đơn giá: ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-black text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs font-bold text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
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
        <div className="p-8 bg-slate-50/80 backdrop-blur-md border-t border-slate-100 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-[15px] font-bold text-slate-500 px-1">
              <span>Tạm tính</span>
              <span className="text-slate-800 tabular-nums">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-[15px] font-bold text-slate-500 px-1">
              <span>Thuế (4.5%)</span>
              <span className="text-slate-800 tabular-nums">
                ${tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center px-1 pt-3 border-t border-slate-200">
              <span className="text-lg font-black text-slate-900">
                Tổng cộng
              </span>
              <span className="text-3xl font-black text-blue-600 tabular-nums">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-3 py-4 bg-white hover:bg-slate-100 border border-slate-200 rounded-3xl font-black text-[14px] text-slate-700 transition-all shadow-sm active:scale-95">
              <Banknote className="w-5 h-5 text-emerald-500" />
              Tiền mặt
            </button>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-5 bg-[#0061d5] hover:bg-blue-700 text-white font-black text-lg rounded-4xl shadow-xl shadow-blue-500/30 transition-all transform active:scale-[0.98] group">
            Hoàn tất thanh toán
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
