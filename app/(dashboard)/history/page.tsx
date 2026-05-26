'use client';

import {
  FileText,
  CheckCircle,
  Calendar,
  Filter,
  Download,
  Printer,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const stats = [
  {
    label: 'TỔNG DOANH SỐ',
    value: '1,284',
    icon: FileText,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    label: 'TỶ LỆ THÀNH CÔNG',
    value: '98.2%',
    icon: CheckCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
];

const orders = [
  {
    id: '#RX-88421',
    date: '24 thg 10, 2023',
    time: '14:32 PM',
    customer: 'Elena Martinez',
    cid: 'P-992384',
    total: '$142.50',
    status: 'Hoàn thành',
    statusColor: 'bg-emerald-500',
    statusBg: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: '#RX-88420',
    date: '24 thg 10, 2023',
    time: '12:15 PM',
    customer: 'Khách vãng lai',
    cid: 'N/A',
    total: '$28.99',
    status: 'Hoàn tiền',
    statusColor: 'bg-rose-500',
    statusBg: 'bg-rose-50 text-rose-600',
  },
  {
    id: '#RX-88419',
    date: '23 thg 10, 2023',
    time: '17:45 PM',
    customer: 'James Harrison',
    cid: 'P-882103',
    total: '$315.00',
    status: 'Hoàn thành',
    statusColor: 'bg-emerald-500',
    statusBg: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: '#RX-88418',
    date: '23 thg 10, 2023',
    time: '16:10 PM',
    customer: 'Sarah Connor',
    cid: 'P-912882',
    total: '$54.25',
    status: 'Hoàn thành',
    statusColor: 'bg-emerald-500',
    statusBg: 'bg-emerald-50 text-emerald-600',
  },
];

export default function HistoryPage() {
  return (
    <div className="space-y-10 animate-fade-in relative">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Lịch sử đơn hàng
          </h1>
          <p className="text-slate-500 font-medium text-[15px]">
            Kiểm tra và quản lý các giao dịch lâm sàng
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full lg:w-auto">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 min-w-0 sm:min-w-[220px]"
            >
              <div className={`p-3 md:p-3.5 ${stat.bg} rounded-2xl shrink-0`}>
                <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-[9px] md:text-[10px] font-black text-slate-400 tracking-widest uppercase mb-0.5">
                  {stat.label}
                </p>
                <p className="text-xl md:text-2xl font-black text-slate-800">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4">
          <div className="flex items-center gap-3 px-6 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] md:text-[14px] font-bold text-slate-600">
            <Calendar className="w-4 h-4 md:w-4.5 md:h-4.5 text-slate-400" />
            <span className="truncate">01/01/2024 - 31/01/2024</span>
          </div>
          <select className="px-6 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] md:text-[14px] font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/10 appearance-none min-w-0 sm:min-w-[180px]">
            <option>Tất cả trạng thái</option>
            <option>Hoàn thành</option>
            <option>Hoàn tiền</option>
          </select>
          <button className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#f1f5f9] hover:bg-slate-200 transition-colors rounded-2xl text-[13px] md:text-[14px] font-black text-slate-600">
            <Filter className="w-4.5 h-4.5" />
            Thêm bộ lọc
          </button>
        </div>
        <div className="flex items-center justify-center lg:justify-end gap-3">
          <button className="p-3.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm">
            <Download className="w-5 h-5" />
          </button>
          <button className="p-3.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm">
            <Printer className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px] lg:min-w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-y border-slate-100">
              <th className="py-6 px-6 md:px-10 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                MÃ ĐƠN HÀNG
              </th>
              <th className="py-6 px-4 md:px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                NGÀY & GIỜ
              </th>
              <th className="py-6 px-4 md:px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                KHÁCH HÀNG
              </th>
              <th className="py-6 px-4 md:px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                TỔNG TIẾN
              </th>
              <th className="py-6 px-4 md:px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                TRẠNG THÁI
              </th>
              <th className="py-6 px-6 md:px-10 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                THAO TÁC
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {orders.map((order, idx) => (
              <tr
                key={idx}
                className="group hover:bg-[#f1f5f9]/40 transition-colors"
              >
                <td className="py-6 md:py-7 px-6 md:px-10">
                  <span className="text-[15px] md:text-[16px] font-black text-slate-800">
                    {order.id}
                  </span>
                </td>
                <td className="py-6 md:py-7 px-4 md:px-6">
                  <div>
                    <p className="text-[14px] md:text-[15px] font-bold text-slate-700 whitespace-nowrap">
                      {order.date}
                    </p>
                    <p className="text-[11px] md:text-[12px] font-bold text-slate-400 mt-0.5">
                      {order.time}
                    </p>
                  </div>
                </td>
                <td className="py-6 md:py-7 px-4 md:px-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    {order.cid === 'N/A' ? (
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[9px] md:text-[10px] font-black text-slate-400 shrink-0">
                        WK
                      </div>
                    ) : (
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[9px] md:text-[10px] font-black text-blue-600 shrink-0">
                        {order.customer
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-[14px] md:text-[15px] font-black text-slate-800 leading-tight truncate">
                        {order.customer}
                      </p>
                      <p className="text-[11px] md:text-[12px] font-bold text-slate-400 mt-0.5">
                        {order.cid}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-6 md:py-7 px-4 md:px-6">
                  <span className="text-[16px] md:text-[17px] font-black text-slate-900 whitespace-nowrap">
                    {order.total}
                  </span>
                </td>
                <td className="py-6 md:py-7 px-4 md:px-6 text-center">
                  <span
                    className={`inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full text-[11px] md:text-[12px] font-black whitespace-nowrap ${order.statusBg}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${order.statusColor}`}
                    />
                    {order.status}
                  </span>
                </td>
                <td className="py-6 md:py-7 px-6 md:px-10 text-center">
                  <button className="p-2 text-slate-300 hover:text-slate-600 group-hover:bg-white rounded-lg transition-all">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination bar */}
        <div className="py-6 px-6 md:px-10 bg-[#f8fafc]/50 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] md:text-[14px] font-bold text-slate-400 text-center md:text-left">
            Hiển thị <span className="text-slate-800">1-4</span> trên tổng số{' '}
            <span className="text-slate-800">1,284</span> đơn hàng
          </p>
          <div className="flex items-center gap-3">
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 disabled:opacity-30">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5">
              <button className="w-9 h-9 rounded-xl bg-[#0061d5] text-white text-[13px] font-black">
                1
              </button>
              <button className="w-9 h-9 rounded-xl bg-white border border-slate-100 text-slate-500 text-[13px] font-bold hover:bg-slate-50">
                2
              </button>
              <button className="w-9 h-9 rounded-xl bg-white border border-slate-100 text-slate-500 text-[13px] font-bold hover:bg-slate-50">
                3
              </button>
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 pb-10">
        {/* Refund Card */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-base md:text-lg font-black text-slate-900">
                Hoàn tiền gần đây
              </h4>
              <p className="text-[13px] md:text-[14px] font-medium text-slate-400">
                Cần giám sát phê duyệt
              </p>
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900">
              12
            </h3>
          </div>
          <div className="w-14 h-14 md:w-16 md:h-16 bg-rose-50 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shrink-0">
            <RotateCcw className="w-7 h-7 md:w-8 md:h-8 text-rose-600" />
          </div>
        </div>

        {/* Revenue Structure Card */}
        <div className="lg:col-span-3 bg-white p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-8 md:mb-10 gap-4">
            <div>
              <h4 className="text-base md:text-lg font-black text-slate-900">
                Cơ cấu doanh thu
              </h4>
              <p className="text-[13px] md:text-[14px] font-medium text-slate-400 mt-1 leading-tight">
                Doanh số thuốc theo đơn VS không kê đơn trong 30 ngày qua
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-4 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 md:w-2.5 h-2 md:h-2.5 bg-[#0061d5] rounded-full" />
                <span className="text-[10px] md:text-[11px] font-black text-slate-600">
                  Theo đơn (74%)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 md:w-2.5 h-2 md:h-2.5 bg-emerald-500 rounded-full" />
                <span className="text-[10px] md:text-[11px] font-black text-slate-600">
                  Không kê đơn (26%)
                </span>
              </div>
            </div>
          </div>
          {/* Mock Bar Chart */}
          <div className="flex items-end justify-between gap-1.5 md:gap-3 h-20 md:h-24">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div
                key={i}
                className="flex-1 flex flex-col gap-1 items-center group"
              >
                <div className="w-full flex flex-col gap-0.5 md:gap-1">
                  <div className="w-full bg-[#0061d5]/10 rounded-t-sm group-hover:bg-[#0061d5]/20 h-10 md:h-12" />
                  <div
                    className="w-full bg-[#0061d5] rounded-b-sm group-hover:bg-blue-700"
                    style={{ height: `${((i * 7) % 30) + 15}px` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
