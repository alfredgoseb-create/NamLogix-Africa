// @ts-nocheck

export default function StatusBadge({ status }) {
  const value = status || "pending";

  return <span style={getStatusStyle(value)}>{value}</span>;
}

function getStatusStyle(status) {
  const base = {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 12,
    textTransform: "uppercase",
  };

  if (status === "confirmed" || status === "reviewed" || status === "active") {
    return {
      ...base,
      background: "#dcfce7",
      color: "#166534",
    };
  }

  if (status === "cancelled" || status === "closed") {
    return {
      ...base,
      background: "#fee2e2",
      color: "#991b1b",
    };
  }

  if (status === "completed") {
    return {
      ...base,
      background: "#e0e7ff",
      color: "#3730a3",
    };
  }

  return {
    ...base,
    background: "#ffedd5",
    color: "#c2410c",
  };
}