import { CSSProperties, ReactNode } from "react";

export function PremiumInput({
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={inputStyle}
    />
  );
}

export function PremiumSelect({
  value,
  onChange,
  children,
}: {
  value?: string;
  onChange?: (e: any) => void;
  children: ReactNode;
}) {
  return (
    <select value={value} onChange={onChange} style={inputStyle}>
      {children}
    </select>
  );
}

export function PremiumTextarea({
  placeholder,
  value,
  onChange,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
}) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={textareaStyle}
    />
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
    <button type="submit" disabled={disabled} style={submitButtonStyle}>
      {children}
    </button>
  );
}

export const formGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 16,
  marginTop: 24,
};

const inputStyle: CSSProperties = {
  width: "100%",
  border: "1px solid #d1d5db",
  borderRadius: 14,
  padding: "14px 15px",
  fontSize: 15,
  background: "#f8fafc",
  outline: "none",
};

const textareaStyle: CSSProperties = {
  ...inputStyle,
  gridColumn: "1 / -1",
  minHeight: 160,
  resize: "vertical",
};

const submitButtonStyle: CSSProperties = {
  background: "#f97316",
  color: "white",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  border: "none",
  cursor: "pointer",
  gridColumn: "1 / -1",
  fontSize: 16,
};