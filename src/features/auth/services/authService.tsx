import { api } from "../../../shared/services/api";
import type { AuthUser } from "../../../app/store/authStore";
import { jwtDecode } from "jwt-decode";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser | null;
}

function normalizeAuthResponse(data: any): AuthResponse {
  const token = data.token;

  if (!token) {
    throw new Error("Token not found in the response.");
  }

  const decoded: any = jwtDecode(token);

  const user = {
    id: decoded?.["sub"],
    name: decoded?.["name"],
    email: decoded?.["email"]
  };

  return {
    token,
    user: user || null,
  };
}

export const AuthService = {
  async login(payload: LoginPayload) {
    const { data } = await api.post("/auth/login", payload);

    if (!data.success) {
      throw new Error(data.message || "Login error.");
    }

    return normalizeAuthResponse(data.response);
  },

  async register(payload: RegisterPayload) {
    const { data } = await api.post("/registration/register", payload);

    if (!data.success) {
      throw new Error(data.message || "Register error.");
    }

    return data;
  },
};
