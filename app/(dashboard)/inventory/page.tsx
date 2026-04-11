"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Pencil,
  Trash2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  PackagePlus,
} from "lucide-react";

const summaryCards = [
  { label: "TỔNG SỐ MẶT HÀNG", value: "1.284", color: "text-blue-600" },
  { label: "TỒN KHO THẤP", value: "12", color: "text-rose-600" },
  { label: "SẮP HẾT HẠN", value: "24", color: "text-emerald-600" },
  { label: "GIÁ TRỊ KHO", value: "$42.8k", color: "text-slate-800" },
];

const categories = ["Tất cả thuốc", "Kháng sinh", "Giảm đau", "Kháng virus"];

const inventoryData = [
  {
    name: "Amoxicillin 500mg",
    sku: "SKU: AMX-500-24",
    category: "Kháng sinh",
    stock: 420,
    maxStock: 600,
    expiry: "24 Th10, 2025",
    price: "$12.40",
    stockType: "normal",
  },
  {
    name: "Atorvastatin 20mg",
    sku: "SKU: ATR-020-08",
    category: "Statins",
    stock: 14,
    maxStock: 100,
    expiry: "12 Th01, 2026",
    price: "$24.00",
    stockType: "low",
  },
  {
    name: "Lisinopril 10mg",
    sku: "SKU: LIS-010-15",
    category: "ACE Inhibitors",
    stock: 112,
    maxStock: 200,
    expiry: "05 Th03, 2024",
    price: "$8.50",
    stockType: "normal",
    expiryColor: "text-emerald-600",
  },
  {
    name: "Metformin 850mg",
    sku: "SKU: MET-850-12",
    category: "Antidiabetic",
    stock: 890,
    maxStock: 1000,
    expiry: "18 Th12, 2026",
    price: "$15.75",
    stockType: "normal",
  },
];

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("Tất cả thuốc");

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Quản lý kho thuốc
          </h1>
          <p className="text-slate-500 font-medium text-[15px]">
            Quản lý mức tồn kho dược phẩm và chu kỳ hết hạn.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex bg-white rounded-2xl border border-slate-100 shadow-sm p-2">
            {summaryCards.map((card, idx) => (
              <div
                key={idx}
                className={`px-6 py-2 flex flex-col items-center justify-center border-r last:border-0 border-slate-50 min-w-[120px]`}
              >
                <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1">
                  {card.label}
                </span>
                <span className={`text-2xl font-black ${card.color}`}>
                  {card.value}
                </span>
              </div>
            ))}
          </div>
          <button className="flex items-center justify-center gap-2.5 px-6 py-4 bg-[#0061d5] hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95 whitespace-nowrap">
            <PackagePlus className="w-5 h-5" />
            Nhập kho
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex bg-white/50 backdrop-blur-sm p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-xl text-[14px] font-bold transition-all ${
                activeTab === cat
                  ? "bg-white text-blue-600 shadow-md shadow-blue-50"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2.5 px-6 py-3 border border-slate-200 rounded-2xl text-[14px] font-bold text-slate-600 hover:bg-white transition-all shadow-sm">
          <Filter className="w-4 h-4" />
          Thêm bộ lọc
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-5xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f8fafc] border-y border-slate-100">
              <th className="py-6 px-10 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                TÊN THUỐC
              </th>
              <th className="py-6 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                DANH MỤC
              </th>
              <th className="py-6 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                MỨC TỒN KHO
              </th>
              <th className="py-6 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                NGÀY HẾT HẠN
              </th>
              <th className="py-6 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                GIÁ BÁN
              </th>
              <th className="py-6 px-10 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                THAO TÁC
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {inventoryData.map((item, idx) => (
              <tr
                key={idx}
                className="group hover:bg-[#f1f5f9]/40 transition-colors"
              >
                <td className="py-8 px-10">
                  <div className="flex items-center gap-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.stockType === "low" ? "bg-rose-50" : "bg-blue-50"}`}
                    >
                      {item.stockType === "low" ? (
                        <AlertTriangle className="w-6 h-6 text-rose-600" />
                      ) : (
                        <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center p-1">
                          <div className="w-full h-full bg-white rounded-full opacity-30" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-[17px] font-black text-slate-800 leading-tight">
                        {item.name}
                      </p>
                      <p className="text-[13px] font-medium text-slate-400 mt-1">
                        {item.sku}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-8 px-6 text-center">
                  <span className="inline-block px-4 py-1.5 bg-slate-100 rounded-full text-[12px] font-bold text-slate-500">
                    {item.category}
                  </span>
                </td>
                <td className="py-8 px-6">
                  <div className="flex flex-col gap-2 min-w-[200px]">
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.stockType === "low" ? "bg-rose-600" : "bg-blue-600"}`}
                        style={{
                          width: `${(item.stock / item.maxStock) * 100}%`,
                        }}
                      />
                    </div>
                    <p
                      className={`text-[13px] font-black ${item.stockType === "low" ? "text-rose-600" : "text-slate-800"}`}
                    >
                      {item.stock} đơn vị
                    </p>
                  </div>
                </td>
                <td className="py-8 px-6">
                  <p
                    className={`text-[15px] font-bold ${item.expiryColor || "text-slate-700"}`}
                  >
                    {item.expiry}
                  </p>
                </td>
                <td className="py-8 px-6">
                  <p className="text-[17px] font-black text-slate-800">
                    {item.price}
                  </p>
                </td>
                <td className="py-8 px-10">
                  <div className="flex items-center justify-center gap-3">
                    <button className="p-2.5 rounded-xl border border-transparent hover:border-slate-200 hover:bg-white text-slate-400 hover:text-blue-600 transition-all">
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 rounded-xl border border-transparent hover:border-slate-200 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination bar */}
        <div className="py-6 px-10 bg-[#f8fafc]/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[14px] font-bold text-slate-400">
            Đang hiển thị <span className="text-slate-800">1-4</span> trên{" "}
            <span className="text-slate-800">1.284</span> loại thuốc
          </p>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-300 hover:text-slate-600 disabled:opacity-50">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg bg-[#0061d5] text-white text-[13px] font-bold">
                1
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-white text-slate-500 text-[13px] font-bold transition-colors">
                2
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-white text-slate-500 text-[13px] font-bold transition-colors">
                3
              </button>
            </div>
            <button className="p-2 text-slate-500 hover:text-slate-800 underline-offset-4">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-[#0061d5] rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/40 hover:scale-110 active:scale-95 transition-all z-50">
        <Plus className="w-8 h-8" />
      </button>

      {/* Bottom Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        <div className="lg:col-span-2 bg-linear-to-r from-blue-50 to-indigo-50 p-10 rounded-5xl border border-blue-100 flex items-center justify-between group overflow-hidden relative">
          <div className="max-w-[500px] relative z-10">
            <h4 className="text-2xl font-black text-slate-900 mb-4">
              Tóm tắt sức khỏe kho hàng
            </h4>
            <p className="text-slate-600 font-medium leading-relaxed">
              Chuỗi cung ứng hiện tại của bạn ổn định.{" "}
              <span className="text-blue-600 font-bold">94%</span> hàng tồn kho
              thiết yếu của bạn ở trên mức tới hạn. Hãy cân nhắc đặt mua thêm{" "}
              <span className="font-bold underline">Atorvastatin</span> trong
              vòng 48 giờ tới.
            </p>
          </div>
          <ShieldCheck className="w-48 h-48 text-blue-100/50 absolute -right-8 -bottom-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-1000" />
        </div>

        <div className="bg-slate-900 p-10 rounded-5xl border border-slate-800 flex flex-col justify-between group relative overflow-hidden">
          <div className="flex items-center justify-between mb-8 relative z-10">
            <Zap className="w-10 h-10 text-blue-500 fill-blue-500 animate-pulse" />
            <span className="bg-white/10 text-white text-[10px] font-black px-3 py-1.5 rounded-lg border border-white/10 uppercase tracking-widest">
              CẦN XỬ LÝ
            </span>
          </div>
          <div className="relative z-10">
            <h4 className="text-2xl font-bold text-white mb-2">Nhập lô mới</h4>
            <p className="text-slate-400 text-[14px] mb-8 font-medium">
              Đang chờ xác nhận cho 3 lô thuốc mới nhập
            </p>
            <button className="w-full py-4 bg-white hover:bg-blue-50 text-slate-900 font-black rounded-2xl transition-all active:scale-95">
              Xử lý ngay
            </button>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[80px]" />
        </div>
      </div>
    </div>
  );
}
