import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { logout } from '../slides/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers) => {
    // Tự động thêm token vào header nếu cần
    // const token = localStorage.getItem("token");
    // if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

// Wrapper để bắt lỗi 401 toàn cục
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.warn('Phiên đăng nhập hết hạn (401). Đang đăng xuất...');

    // Xử lý đăng xuất tại đây:
    // 1. Dispatch action clear credentials
    api.dispatch(logout());

    // 2. Redirect về login
    if (
      typeof window !== 'undefined' &&
      window.location.pathname !== '/login' &&
      window.location.pathname !== '/register'
    ) {
      window.location.href = '/login';
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: () => ({}),
});
