import type { ReactNode } from "react";

type AppCardProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function AppCard({
  children,
  className = "",
  id,
}: AppCardProps) {
  return (
    <div
      id={id}
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ${className}`}
    >
      {children}
    </div>
  );
}