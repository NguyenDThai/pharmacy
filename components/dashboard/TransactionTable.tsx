import React from "react";
import { ListFilter, MoreHorizontal } from "lucide-react";

const transactions = [
  {
    id: "#TXN-9402",
    patient: "Nguyễn Văn A",
    product: "Paracetamol 500mg, Vitamin C",
    status: "Hoàn tất",
    total: "$42.00"
  },
  {
    id: "#TXN-9401",
    patient: "Trần Thị B",
    product: "Amoxicillin Caps, Cough Syrup",
    status: "Chờ thanh toán",
    total: "$128.50"
  },
  {
    id: "#TXN-9400",
    patient: "Lê Văn C",
    product: "Insulin Glargine",
    status: "Hủy",
    total: "$85.00"
  }
];

export function TransactionTable() {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-xl font-extrabold text-slate-800">Giao dịch gần đây</h4>
        <button className="flex items-center gap-2.5 px-5 py-2.5 bg-[#f1f5f9] hover:bg-slate-200 transition-colors rounded-xl text-[13px] font-black text-slate-600">
          <ListFilter className="w-4 h-4" />
          Lọc theo loại
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f8fafc] border-y border-slate-100">
              <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest first:rounded-l-2xl last:rounded-r-2xl">MÃ GIAO DỊCH</th>
              <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">BỆNH NHÂN / KHÁCH HÀNG</th>
              <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">SẢN PHẨM</th>
              <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">TRẠNG THÁI</th>
              <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">TỔNG TIỀN</th>
              <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">THAO TÁC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((txn, idx) => (
              <tr key={idx} className="group hover:bg-[#f1f5f9]/30 transition-colors">
                <td className="py-5 px-6 text-[14px] font-bold text-slate-800">{txn.id}</td>
                <td className="py-5 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[11px] font-black text-slate-400">
                      {txn.patient.charAt(0)}
                    </div>
                    <span className="text-[14px] font-extrabold text-slate-800">{txn.patient}</span>
                  </div>
                </td>
                <td className="py-5 px-6 text-[14px] font-medium text-slate-500 max-w-[200px] truncate">{txn.product}</td>
                <td className="py-5 px-6">
                  <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-black ${
                    txn.status === 'Hoàn tất' ? 'bg-emerald-50 text-emerald-600' : 
                    txn.status === 'Chờ thanh toán' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {txn.status}
                  </span>
                </td>
                <td className="py-5 px-6 text-[15px] font-black text-slate-800">{txn.total}</td>
                <td className="py-5 px-6 text-center">
                  <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-100">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
