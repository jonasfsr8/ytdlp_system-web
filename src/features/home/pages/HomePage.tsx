import { useAuthStore } from "../../../app/store/authStore";
import { useAuth } from "../../auth/hooks/useAuth";
import { TrackingForm } from "../components/TrackingForm";
import { useFormats } from "../hooks/useFormats";
import { AppShell } from "../../../shared/components/AppShell";
import { Button } from "../../../shared/components/Button";
import { FeedbackMessage } from "../../../shared/components/FeedbackMessage";
import { PageLoader } from "../../../shared/components/PageLoader";

export function HomePage() {
  const { logout } = useAuth();
  const user = useAuthStore((state) => state.user);
  const { formats, isLoading, error } = useFormats();

  return (
    <AppShell
      title={`Panel${user?.name ? `, ${user.name}` : ""}`}
      subtitle=""
      actions={
        <Button variant="secondary" onClick={logout}>
          Sair
        </Button>
      }
    >
      <section className="hero-grid">
        <article className="highlight-card">
          <span className="eyebrow">Operation</span>
          <h2>URLs routes process</h2>
          <p>Check if the video supports the chosen quality.</p>
        </article>

        <article className="stats-card">
          <span>Endpoint base</span>
          <strong>{"Status: Ok"}</strong>
          <small>Configured API base: Uta 39.291° N, 8.952° E.</small>
        </article>
      </section>

      {isLoading ? <PageLoader /> : null}
      {!isLoading && error ? <FeedbackMessage type="error" message={error} /> : null}
      {!isLoading && !error ? <TrackingForm formats={formats} /> : null}
    </AppShell>
  );
}
