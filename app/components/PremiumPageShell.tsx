import Link from "next/link";
import { CSSProperties, ReactNode } from "react";

type Action = {
  label: string;
  href: string;
  variant?: "orange" | "blue" | "white";
};

export default function PremiumPageShell({
  badge,
  title,
  description,
  actions = [],
  children,
}: {
  badge: string;
  title: string;
  description: string;
  actions?: Action[];
  children: ReactNode;
}) {
  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>{badge}</p>

          <h1 style={titleStyle}>{title}</h1>

          <p style={descStyle}>{description}</p>

          {actions.length > 0 && (
            <div style={buttonRowStyle}>
              {actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  style={
                    action.variant === "blue"
                      ? buttonBlue
                      : action.variant === "white"
                      ? buttonWhite
                      : buttonOrange
                  }
                >
                  {action.label}
                </Link>
              ))}
            </div>
          )}
        </section>

        {children}
      </div>
    </div>
  );
}

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  background: "#f6f8fc",
  padding: "40px 24px",
};

const containerStyle: CSSProperties = {
  maxWidth: 1100,
  margin: "0 auto",
};

const heroStyle: CSSProperties = {
  background: "linear-gradient(135deg, #0b1220, #1e3a8a, #f97316)",
  color: "white",
  borderRadius: 28,
  padding: 36,
  marginBottom: 24,
  boxShadow: "0 20px 40px rgba(15,23,42,0.22)",
};

const badgeStyle: CSSProperties = {
  color: "#fed7aa",
  fontWeight: 900,
  letterSpacing: 1,
  margin: 0,
};

const titleStyle: CSSProperties = {
  fontSize: 42,
  fontWeight: 900,
  margin: "10px 0",
};

const descStyle: CSSProperties = {
  maxWidth: 760,
  lineHeight: 1.7,
  color: "rgba(255,255,255,0.85)",
};

const buttonRowStyle: CSSProperties = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  marginTop: 24,
};

const buttonOrange: CSSProperties = {
  background: "#f97316",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonBlue: CSSProperties = {
  background: "#1d4ed8",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonWhite: CSSProperties = {
  background: "white",
  color: "#1d4ed8",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};