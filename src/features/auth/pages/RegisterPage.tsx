import { useState, type SubmitEvent } from "react";
import { AuthCard } from "../components/AuthCard";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../../../shared/components/Button";
import { FeedbackMessage } from "../../../shared/components/FeedbackMessage";
import { InputField } from "../../../shared/components/FormField";

export function RegisterPage() {
  const { register, isLoading, error, clearError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    clearError();
    try {
      await register({ name, email, password });
    } catch {
      return;
    }
  }

  return (
    <div className="auth-page">
      <AuthCard
        title="Create your account"
        subtitle="That's if you want to, of course."
        footerText="Already have an account?"
        footerLinkLabel="Log in"
        footerLinkTo="/login"
      >
        <form className="stack-lg" onSubmit={handleSubmit}>
          {error ? <FeedbackMessage type="error" message={error} /> : null}

          <InputField
            label="Name"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

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
            placeholder="Xxx@48"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
          />

          <Button type="submit" isLoading={isLoading}>
            Criar conta
          </Button>
        </form>
      </AuthCard>
    </div>
  );
}
