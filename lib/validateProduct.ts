import { getTodayISOString } from "@/lib/formatVietnameseDate";
import { ProductFormData } from "@/types/products.type";

export const validateProduct = (
  formData: ProductFormData,
  price: string,
): Record<string, string> => {
  const errors: Record<string, string> = {};
  const today = new Date();

  //   Kiểm tra tên sản phẩm
  if (!formData.name.trim()) {
    errors.name = "Vui lòng nhập tên sản phẩm";
  }

  //   Kiểm tra danh mục
  if (!formData.category.trim()) {
    errors.category = "Vui lòng chọn danh mục";
  }

  //   Kiểm tra số lượng
  const qty = Number(formData.quantity);
  if (!formData.quantity || qty <= 0) {
    errors.quantity = "Số lượng không được để trống";
  } else if (isNaN(qty) || qty <= 0) {
    errors.quantity = "Số lượng nhập phải lớn 0";
  }

  //   Kiểm tra ngày hết hạn
  if (!formData.expiryDate) {
    errors.expiryDate = "Vui lòng chọn ngày hết hạn";
  } else {
    const todayISO = getTodayISOString(today);
    if (formData.expiryDate < todayISO) {
      errors.expiryDate = "Ngày hết hạn không được nhỏ hơn ngày hôm nay.";
    }
  }

  const rawPrice = Number(price.replace(/\./g, ""));
  if (!price) {
    errors.price = "Giá không được để trống";
  } else if (isNaN(rawPrice) || rawPrice <= 0) {
    errors.price = "Giá bán phải lớn hơn 0đ.";
  }
  return errors;
};
