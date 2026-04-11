"use client";

import React, { useState } from "react";

const days = ["THỨ 2", "THỨ 3", "THỨ 4", "THỨ 5", "THỨ 6", "THỨ 7", "CN"];
const barData = [65, 45, 75, 55, 90, 40, 60];

export function RevenueChart() {
  const [filter, setFilter] = useState("Tuần");

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-10">
        <h4 className="text-xl font-extrabold text-slate-800">Phân tích doanh số hàng tuần</h4>
        <div className="flex bg-[#f1f5f9] p-1.5 rounded-xl">
          {["Ngày", "Tuần"].map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`px-5 py-1.5 rounded-lg text-[13px] font-black transition-all ${
                filter === opt ? "bg-[#0061d5] text-white shadow-md shadow-blue-100" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2 min-h-[250px]">
        {barData.map((val, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-6 group">
            <div className="w-full relative">
              <div 
                className="w-full bg-[#f1f5f9] rounded-2xl group-hover:bg-blue-50 transition-colors duration-500 overflow-hidden relative"
                style={{ height: '240px' }}
              >
                <div 
                  className="absolute bottom-0 left-0 w-full bg-[#0061d5] rounded-2xl group-hover:bg-blue-600 transition-all duration-1000 ease-out shadow-[0_-8px_16px_rgba(0,97,213,0.15)] opacity-0 group-hover:opacity-100"
                  style={{ height: `${val}%`, opacity: 1 }}
                />
              </div>
            </div>
            <span className="text-[10px] font-black text-slate-400 tracking-wider transition-colors group-hover:text-blue-600">
              {days[idx]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
