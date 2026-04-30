import { Navigate, Route, Routes } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { PublicOnlyGuard } from "./PublicOnlyGuard";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import { RegisterPage } from "../../features/auth/pages/RegisterPage";
import { HomePage } from "../../features/home/pages/HomePage";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicOnlyGuard />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<AuthGuard />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
