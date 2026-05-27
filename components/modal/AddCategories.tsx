import React, { useState } from 'react';
import { Plus, Trash, X } from 'lucide-react';

interface AddCategoriesProps {
  onClose: () => void;
}

const AddCategories = ({ onClose }: AddCategoriesProps) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setError('Tên danh mục không được để trống.');
      return;
    }

    // Tiến hành lưu danh mục mới ở đây (VD: gọi API hoặc dispatch Redux)
    console.warn('Danh mục mới thêm:', categoryName);

    // Đóng modal sau khi thêm thành công
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Overlay mờ nhẹ đè lên modal sản phẩm phía sau */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs "
        onClick={onClose}
      />

      {/* Hộp Modal Thêm Danh mục */}
      <div
        className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 z-10 "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút Đóng (X) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Tiêu đề */}
        <div className="mb-6">
          <h4 className="text-lg font-black text-slate-950">
            Thêm danh mục mới
          </h4>
          <p className="text-xs text-slate-400 font-semibold mt-1">
            Phân loại thuốc để quản lý kho dễ dàng.
          </p>
        </div>

        {/* Form nhập liệu */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Tên danh mục
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
                if (error) setError('');
              }}
              placeholder="VD: Thuốc nhỏ mắt"
              className={`w-full px-4 py-3 bg-slate-50 border ${
                error
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-slate-200 focus:border-blue-500'
              } focus:bg-white rounded-xl text-slate-800 placeholder:text-slate-300 outline-hidden transition-all text-sm font-semibold`}
            />
            {error && (
              <p className="text-rose-500 text-[11px] font-bold mt-1 pl-1">
                {error}
              </p>
            )}
          </div>

          {/* Các nút hành động */}
          <div className="flex gap-3 pt-4 border-t border-slate-50">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 py-3 bg-[#0061d5] hover:bg-blue-700 text-white rounded-xl text-sm font-black shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all active:scale-[0.98] cursor-pointer"
            >
              <Plus size={16} /> Thêm mới
            </button>
          </div>
        </form>

        {/* Danh sách các danh mục */}
        <div className="flex flex-col mt-6">
          <h4 className="font-bold text-slate-900 text-md mb-4">
            Các danh mục (10)
          </h4>
          <div className="max-h-52 overflow-y-auto pr-1.5 space-y-1 custom-scrollbar">
            <div className="w-full p-4 flex items-center justify-between hover:bg-slate-50 rounded-lg">
              <span className="text-slate-700 text-sm">Kháng sinh</span>
              <Trash className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
            </div>
            <div className="w-full p-4 flex items-center justify-between hover:bg-slate-50 rounded-lg">
              <span className="text-slate-700 text-sm">Giảm đau</span>
              <Trash className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
            </div>
            <div className="w-full p-4 flex items-center justify-between hover:bg-slate-50 rounded-lg">
              <span className="text-slate-700 text-sm">Sốt</span>
              <Trash className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
            </div>
            <div className="w-full p-4 flex items-center justify-between hover:bg-slate-50 rounded-lg">
              <span className="text-slate-700 text-sm">Vitamin</span>
              <Trash className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
            </div>
            <div className="w-full p-4 flex items-center justify-between hover:bg-slate-50 rounded-lg">
              <span className="text-slate-700 text-sm">Kháng virus</span>
              <Trash className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategories;
