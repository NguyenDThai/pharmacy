import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  badge?: string;
  iconBg?: string;
  iconColor?: string;
  progressBar?: boolean;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  badge, 
  iconBg = "bg-blue-50", 
  iconColor = "text-blue-600",
  progressBar = false
}: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3.5 ${iconBg} rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        {trend && (
          <span className="bg-emerald-50 text-emerald-600 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
            {trend}
          </span>
        )}
        {badge && (
          <span className="bg-rose-50 text-rose-600 text-[11px] font-bold px-2 py-0.5 rounded-full border border-rose-100">
            {badge}
          </span>
        )}
      </div>

      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-0.5">{title}</p>
      <h3 className={`text-3xl font-black ${badge && badge.includes('Mục') ? 'text-rose-600' : 'text-slate-800'} tracking-tight`}>
        {value}
      </h3>

      {progressBar && (
        <div className="mt-6 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="w-[70%] h-full bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
        </div>
      )}
    </div>
  );
}
