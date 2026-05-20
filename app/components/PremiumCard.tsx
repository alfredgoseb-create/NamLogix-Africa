import { CSSProperties, ReactNode } from "react";

export default function PremiumCard({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return <section style={{ ...cardStyle, ...style }}>{children}</section>;
}

const cardStyle: CSSProperties = {
  background: "white",
  borderRadius: 24,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.10)",
};