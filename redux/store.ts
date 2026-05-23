import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./api/baseApi";
import authReducer from "./slides/authSlice";

export const store = configureStore({
  reducer: {
    // API Reducer (RTK Query)
    [baseApi.reducerPath]: baseApi.reducer,
    // Auth Slice Reducer
    auth: authReducer,
  },
  // Thêm middleware của RTK Query để hỗ trợ caching, invalidation, polling...
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Cấu hình listeners để hỗ trợ refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

// Export các type để sử dụng với TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
