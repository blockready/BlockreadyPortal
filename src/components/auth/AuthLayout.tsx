import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: Props) {
  return (
    <div className="br-auth-layout">
      {/* ── Left brand panel ── */}
      <div className="br-auth-brand">
        <div className="br-auth-brand-inner">
          <div className="br-auth-logo">
            <div className="br-auth-logo-mark">
  <img
    src="/blockready-logo.png"
    alt="Blockready Logo"
    className="br-auth-logo-image"
  />
</div>
            <span className="br-auth-logo-name">Blockready</span>
          </div>

          <h1>Your gateway to digital asset education</h1>

          <p>
            Practical guides, templates, and research to help you understand
            blockchain, AI, and the evolving digital economy.
          </p>

          <div className="br-auth-features">
            {[
              "Blockchain fundamentals & advanced guides",
              "AI and digital asset research",
              "Templates for real-world applications",
              "Weekly curated resource updates",
            ].map((f) => (
              <div className="br-auth-feature" key={f}>
                <div className="br-auth-feature-icon">✓</div>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="br-auth-right">
        <div className="br-auth-card">
          <div className="br-auth-card-header">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}