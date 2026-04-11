import React from "react";
import {
  DollarSign,
  ClipboardList,
  AlertCircle,
  CalendarClock,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { StockAlerts } from "@/components/dashboard/StockAlerts";
import { Expirations } from "@/components/dashboard/Expirations";
import { TransactionTable } from "@/components/dashboard/TransactionTable";

export default function DashboardPage() {
  return (
    <div
      className="space-y-10 animate-fade-in opacity-0"
      style={{ animationFillMode: "forwards" }}
    >
      {/* Title Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Tổng quan bảng điều khiển
        </h1>
        <p className="text-slate-500 font-medium text-[15px]">
          Các chỉ số thời gian thực cho Cơ sở Chính Apothecary.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          title="TỔNG DOANH THU HÔM NAY"
          value="$14,284.50"
          icon={DollarSign}
          trend="+12.5%"
        />
        <StatCard
          title="ĐƠN THUỐC ĐÃ KÊ"
          value="142"
          icon={ClipboardList}
          iconBg="bg-indigo-50"
          iconColor="text-indigo-600"
          progressBar
        />
        <StatCard
          title="CẢNH BÁO SẮP HẾT HÀNG"
          value="Khẩn cấp"
          icon={AlertCircle}
          badge="8 Mục"
          iconBg="bg-rose-50"
          iconColor="text-rose-600"
        />
        <StatCard
          title="SẮP HẾT HẠN (30 NGÀY)"
          value="24"
          icon={CalendarClock}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      {/* Charts and Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* Biểu đồ doanh thu */}
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        {/* Cảnh báo sắp hết hàng */}
        <div className="flex flex-col gap-8">
          <div className="flex-1">
            <StockAlerts />
          </div>
          {/* Sắp hết hạn */}
          <div className="h-[250px]">
            <Expirations />
          </div>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="pb-10">
        <TransactionTable />
      </div>
    </div>
  );
}
