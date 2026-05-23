import { logout, setCredentials } from "@/redux/slides/authSlice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export function useGetMe() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(!user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          dispatch(setCredentials({ user: data.user, token: data.toke }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Lỗi lấy thông tin người dùng đăng nhập:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [dispatch, user]);

  return { user, loading };
}
