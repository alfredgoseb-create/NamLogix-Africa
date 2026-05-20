import { CSSProperties } from "react";

type Stat = {
  label: string;
  value: string | number;
  text: string;
};

export default function PremiumStats({ stats }: { stats: Stat[] }) {
  return (
    <section style={statsGridStyle}>
      {stats.map((stat) => (
        <div key={stat.label} style={statCardStyle}>
          <p style={statLabelStyle}>{stat.label}</p>
          <h3 style={statValueStyle}>{stat.value}</h3>
          <p style={statTextStyle}>{stat.text}</p>
        </div>
      ))}
    </section>
  );
}

const statsGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
  marginBottom: 24,
};

const statCardStyle: CSSProperties = {
  background: "white",
  borderRadius: 22,
  padding: 22,
  border: "1px solid #e5e7eb",
  boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
};

const statLabelStyle: CSSProperties = {
  color: "#64748b",
  fontWeight: 800,
  margin: 0,
};

const statValueStyle: CSSProperties = {
  fontSize: 30,
  fontWeight: 900,
  margin: "8px 0",
  color: "#0f172a",
};

const statTextStyle: CSSProperties = {
  color: "#64748b",
  margin: 0,
};