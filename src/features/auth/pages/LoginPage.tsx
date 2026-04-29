import { useState, type SubmitEvent } from "react";
import { AuthCard } from "../components/AuthCard";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../../../shared/components/Button";
import { FeedbackMessage } from "../../../shared/components/FeedbackMessage";
import { InputField } from "../../../shared/components/FormField";

export function LoginPage() {
  const { login, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    clearError();

    try {
      await login({ email, password });
      
    } catch {
      return;
    }
  }

  return (
    <div className="auth-page">
      <AuthCard
        title="Login to your account"
        subtitle="Manage URL submissions with a modern, scalable, and growth-ready foundation."
        footerText="Don't have an account yet?"
        footerLinkLabel="Create registration"
        footerLinkTo="/register"
      >
        <form className="stack-lg" onSubmit={handleSubmit}>
          {error ? <FeedbackMessage type="error" message={error} /> : null}

          <InputField
            label="E-mail"
            type="email"
            placeholder="name@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <Button type="submit" isLoading={isLoading}>
            Login
          </Button>
        </form>
      </AuthCard>
    </div>
  );
}
