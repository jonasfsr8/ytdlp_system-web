import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface AuthCardProps extends PropsWithChildren {
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkLabel: string;
  footerLinkTo: string;
}

export function AuthCard({
  title,
  subtitle,
  footerText,
  footerLinkLabel,
  footerLinkTo,
  children,
}: AuthCardProps) {
  return (
    <section className="auth-card">
      <div className="auth-card__hero">
        <span className="eyebrow">{"url catch <->"}</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="auth-card__form">{children}</div>

      <footer className="auth-card__footer">
        <span>{footerText}</span>
        <Link to={footerLinkTo}>{footerLinkLabel}</Link>
      </footer>
    </section>
  );
}
