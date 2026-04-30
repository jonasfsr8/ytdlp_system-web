import type { PropsWithChildren, ReactNode } from "react";

interface AppShellProps extends PropsWithChildren {
  title: string;
  subtitle: string;
  actions?: ReactNode;
}

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div>
          <span className="eyebrow">{"Stream Grab"}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {actions ? <div className="app-shell__actions">{actions}</div> : null}
      </header>

      <main>{children}</main>
    </div>
  );
}
