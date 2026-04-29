import type { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <BrowserRouter>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "16px",
            background: "#14213d",
            color: "#f8f5f0",
            border: "1px solid rgba(255,255,255,0.08)",
          },
        }}
      />
    </BrowserRouter>
  );
}
