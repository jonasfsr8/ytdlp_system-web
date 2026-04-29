import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../../../app/store/authStore";
import { AuthService } from "../services/authService";
import { getErrorMessage } from "../../../shared/utils/https";

export function useAuth() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const logoutStore = useAuthStore((state) => state.logout);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function clearError() {
    setError(null);
  }

  async function login(payload: { email: string; password: string }) {
    try {
      setIsLoading(true);
      setError(null);

      const response = await AuthService.login(payload);

      setAuth(response);

      toast.success("login successfully.");
      navigate("/");
    } catch (err: any) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  async function register(payload: any) {
    try {
      setIsLoading(true);
      await AuthService.register(payload);

      toast.success("Registration completed.");
      navigate("/login");
    } catch (err: any) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    logoutStore();
    toast.success("Logged out");
    navigate("/login");
  }

  return {
    login,
    register,
    logout,
    isLoading,
    error,
    clearError,
  };
}
