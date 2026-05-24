import { logout, setCredentials, setLoading } from "@/redux/slides/authSlice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useMeMutation } from "@/redux/api/authApi";

export function useGetMe() {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [getMe] = useMeMutation();

  useEffect(() => {
    if (!isLoading || user) {
      return;
    }

    const fetchCurrentUser = async () => {
      try {
        const res = await getMe().unwrap();

        if (res && res.user) {
          dispatch(setCredentials({ user: res.user, token: res.token }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Lỗi lấy thông tin người dùng đăng nhập:", error);
        dispatch(logout());
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCurrentUser();
  }, [dispatch, user, isLoading]);
}
