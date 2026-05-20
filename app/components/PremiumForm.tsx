"use client";

import { CSSProperties, ReactNode } from "react";

export function PremiumInput(props: any) {
  return <input {...props} style={{ ...inputStyle, ...props.style }} />;
}

export function PremiumTextarea(props: any) {
  return <textarea {...props} style={{ ...textareaStyle, ...props.style }} />;
}

export function PremiumSelect({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) {
  return (
    <select {...props} style={{ ...inputStyle, ...props.style }}>
      {children}
    </select>
  );
}

export function PremiumSubmitButton({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      style={{
        ...submitButtonStyle,
        opacity: disabled ? 0.7 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
    </button>
  );
}

export const formGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 16,
  marginTop: 24,
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "15px 16px",
  borderRadius: 16,
  border: "1px solid #cbd5e1",
  background: "#f8fafc",
  color: "#0f172a",
  fontSize: 15,
  outline: "none",
  boxSizing: "border-box",
};

const textareaStyle: CSSProperties = {
  ...inputStyle,
  minHeight: 130,
  resize: "vertical",
  gridColumn: "1 / -1",
};

const submitButtonStyle: CSSProperties = {
  gridColumn: "1 / -1",
  background: "linear-gradient(135deg, #1d4ed8, #f97316)",
  color: "white",
  border: "none",
  padding: "16px 20px",
  borderRadius: 18,
  fontWeight: 900,
  fontSize: 16,
  boxShadow: "0 14px 28px rgba(29,78,216,0.25)",
};