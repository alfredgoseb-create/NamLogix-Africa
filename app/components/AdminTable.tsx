// @ts-nocheck

import { ReactNode } from "react";

export default function AdminTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode;
}) {
  return (
    <div style={wrapperStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} style={headerStyle}>
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

const wrapperStyle = {
  width: "100%",
  overflowX: "auto" as const,
  background: "white",
  borderRadius: 24,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse" as const,
  minWidth: 900,
};

const headerStyle = {
  textAlign: "left" as const,
  padding: "18px 20px",
  background: "#f8fafc",
  borderBottom: "1px solid #e5e7eb",
  color: "#0f172a",
  fontWeight: 900,
  fontSize: 14,
};