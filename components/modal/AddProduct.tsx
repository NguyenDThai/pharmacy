import React, { useState } from 'react';
import { ChevronDown, Plus, X } from 'lucide-react';
import {
  formatVietnameseDate,
  getTodayISOString,
} from '@/lib/formatVietnameseDate';
import { validateProduct } from '@/lib/validateProduct';
import AddCategories from '@/components/modal/AddCategories';

interface AddProductProps {
  onClose: () => void;
}

const AddProduct = ({ onClose }: AddProductProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    expiryDate: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [price, setPrice] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Xóa lỗi của trường đó ngay khi người dùng bắt đầu sửa/nhập lại
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');

    if (!rawValue) {
      setPrice('');
      return;
    }

    const formattedValue = new Intl.NumberFormat('vi-VN').format(
      Number(rawValue)
    );
    setPrice(formattedValue);

    // Tự động xóa thông báo lỗi của Giá bán ngay khi người dùng bắt đầu nhập lại giá mới
    if (errors.price) {
      setErrors((prev) => ({ ...prev, price: '' }));
    }
  };

  //   Xử lý lại giá để gửi lên server
  const rawPriceNumber = Number(price.replace(/\./g, ''));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gọi hàm validate từ lib
    const validationErrors = validateProduct(formData, price);

    // Kiểm tra xem có lỗi nào không
    const isValid = Object.keys(validationErrors).length === 0;

    if (isValid) {
      const finalData = {
        name: formData.name,
        category: formData.category,
        quantity: Number(formData.quantity),
        expiryDate: formData.expiryDate,
        price: rawPriceNumber,
      };

      console.warn('🚀 ~ handleSubmit ~ finalData:', finalData);

      onClose();
    } else {
      setErrors(validationErrors);
    }
  };

  const today = new Date();
  const formattedPlaceholder = formatVietnameseDate(today);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      {/* 1. LỚP OVERLAY (Lớp phủ mờ nền phía sau) */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
        onClick={onClose} // Click vào nền tối sẽ đóng modal
      />

      {/* 2. HỘP NỘI DUNG MODAL (Modal Content Box) */}
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 md:p-10 z-10"
        onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click từ bên trong modal lan ra lớp overlay
      >
        {/* Nút đóng (X) góc trên bên phải */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all active:scale-95 cursor-pointer"
          aria-label="Đóng modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tiêu đề Modal */}
        <div className="mb-8 border-b border-slate-100 pb-6">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Nhập sản phẩm mới
          </h3>
        </div>

        {/* Form điền thông tin (Demo khung form cực đẹp) */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Tên sản phẩm */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="VD: Amoxicillin 500mg"
              className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-2xl text-slate-800 placeholder:text-slate-300 outline-hidden transition-all duration-300 font-semibold"
            />
            {errors.name && (
              <p className="text-rose-500 text-xs font-semibold mt-1 pl-2">
                {errors.name}
              </p>
            )}
          </div>

          {/* Loaị sản phẩm */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Loại sản phẩm
            </label>
            <div className="relative">
              <select
                name="category"
                id="category"
                onChange={(e) => {
                  handleInputChange(e);
                  e.target.blur();
                }}
                value={formData.category}
                className="peer w-full px-5 py-4 bg-slate-50/50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-2xl text-slate-800 placeholder:text-slate-300 outline-hidden transition-all duration-300 font-semibold appearance-none"
              >
                <option value="">Chọn danh mục</option>
                <option value="Kháng sinh">Kháng sinh</option>
                <option value="Giảm đau">Giảm đau</option>
                <option value="Kháng virus">Kháng virus</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 font-semibold w-5 h-5 transition-transform duration-300 pointer-events-none rotate-180 peer-focus:rotate-0" />
            </div>

            <div className="flex items-center gap-1 mt-2">
              <Plus className="w-4 h-4 text-slate-400" />
              <button
                type="button"
                onClick={() => setShowAddCategory(true)}
                className="text-sm hover:text-blue-600 cursor-pointer transition-all duration-300"
              >
                Thêm danh mục
              </button>
            </div>

            {errors.category && (
              <p className="text-rose-500 text-xs font-semibold mt-1 pl-2">
                {errors.category}
              </p>
            )}
          </div>

          {/* Số lượng và ngày hết hạn */}
          <div className="flex justify-between gap-2">
            <div className="flex flex-col flex-1">
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2">
                Số lượng
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="0"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-2xl text-slate-800 placeholder:text-slate-300 outline-hidden transition-all duration-300 font-semibold"
              />

              {errors.quantity && (
                <p className="text-rose-500 text-xs font-semibold mt-1 pl-2">
                  {errors.quantity}
                </p>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2">
                Ngày hết hạn
              </label>
              <input
                type="text"
                placeholder={formattedPlaceholder}
                name="expiryDate"
                value={formData.expiryDate}
                min={getTodayISOString(today)}
                onFocus={(e) => {
                  e.target.type = 'date';
                }}
                onBlur={(e) => {
                  if (!e.target.value) {
                    e.target.type = 'text';
                  }
                }}
                onChange={handleInputChange}
                className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-2xl text-slate-800 placeholder:text-slate-300 outline-hidden transition-all duration-300 font-semibold"
              />

              {errors.expiryDate && (
                <p className="text-rose-500 text-xs font-semibold mt-1 pl-2">
                  {errors.expiryDate}
                </p>
              )}
            </div>
          </div>

          {/* Giá bán */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Giá bán
            </label>
            <div className="relative">
              <input
                type="text"
                value={price}
                onChange={handlePriceChange}
                placeholder="0"
                className=" w-full px-5 py-4 bg-slate-50/50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-2xl text-slate-800 placeholder:text-slate-300 outline-hidden transition-all duration-300 font-semibold"
              />

              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-[12px]">
                VND
              </span>
            </div>

            {errors.price && (
              <p className="text-rose-500 text-xs font-semibold mt-1 pl-2">
                {errors.price}
              </p>
            )}
          </div>
          {/* Nút hành động phía dưới */}
          <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 border border-slate-200 hover:bg-slate-50 rounded-2xl text-[14px] font-black text-slate-500 transition-all active:scale-95"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-[#0061d5] hover:bg-blue-700 text-white rounded-2xl text-[14px] font-black shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all active:scale-95"
            >
              Nhập sản phẩm
            </button>
          </div>
        </form>
      </div>

      {/* Modal Add Categories */}
      {showAddCategory && (
        <AddCategories onClose={() => setShowAddCategory(false)} />
      )}
    </div>
  );
};

export default AddProduct;
