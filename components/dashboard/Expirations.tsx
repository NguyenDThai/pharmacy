import React from "react";

const data = [
  { name: "Insulin Glargine", count: "12 Th10" },
  { name: "Lisinopril 10mg", count: "24 Th10" },
  { name: "Atorvastatin 20mg", count: "02 Th11" }
];

export function Expirations() {
  return (
    <div className="bg-[#f1f5f9]/50 p-8 rounded-4xl h-full flex flex-col">
      <h4 className="text-lg font-extrabold text-slate-800 mb-6">Sắp hết hạn</h4>
      
      <div className="space-y-5">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between group cursor-default">
            <span className="text-[15px] font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
              {item.name}
            </span>
            <span className="text-[15px] font-black text-rose-600 tabular-nums">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
