import React from 'react';
import { AlertTriangle, Package2 } from 'lucide-react';

const alerts = [
  {
    name: 'Paracetam...',
    desc: 'Còn lại 12 đơn vị',
    type: 'critical',
    action: 'ĐẶT HÀNG LẠI',
  },
  {
    name: 'Amoxicillin Caps',
    desc: 'Chỉ còn 8 hộp trong kho',
    type: 'warning',
  },
];

export function StockAlerts() {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-lg font-extrabold text-slate-800">
          Cảnh báo tồn kho
        </h4>
        <button className="text-[13px] font-bold text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 transition-all">
          Xem tất cả
        </button>
      </div>

      <div className="space-y-4 flex-1">
        {alerts.map((alert, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl flex items-center justify-between gap-4 transition-all hover:scale-[1.02] cursor-default ${
              alert.type === 'critical'
                ? 'bg-rose-50/50 border border-rose-100'
                : 'bg-[#f8fafc] border border-slate-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl ${alert.type === 'critical' ? 'bg-rose-600' : 'bg-slate-800'}`}
              >
                {alert.type === 'critical' ? (
                  <AlertTriangle className="w-5 h-5 text-white" />
                ) : (
                  <Package2 className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-extrabold text-slate-800 truncate">
                  {alert.name}
                </p>
                <p className="text-[13px] font-medium text-slate-500">
                  {alert.desc}
                </p>
              </div>
            </div>
            {alert.action && (
              <button className="whitespace-nowrap bg-rose-100 text-rose-600 text-[10px] font-black px-3 py-2 rounded-lg hover:bg-rose-200 transition-colors">
                {alert.action}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
