import { useMutation } from "@tanstack/react-query";
import api from "../../api";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "./authSlice";
          //Login
export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post("/api/auth/login", credentials);
      return response.data;
    },

    onSuccess: (data) => {
      const token = data.accessToken; // ✅ correct key

      localStorage.setItem("token", token);
      dispatch(loginSuccess(token));

      console.log("Login successful ✅ Token:", token);
    },

    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

              //Register
export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await api.post(
        "/api/auth/register",
        userData
      );
      return response.data;
    },
  });
};
              //Logout
export const useLogout = () => {
  const dispatch = useDispatch();

  return () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
};