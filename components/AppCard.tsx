import type { ReactNode } from "react";

type AppCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export default function AppCard({
  children,
  className = "",
  hover = false,
}: AppCardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow p-6 ${
        hover ? "hover:shadow-lg transition cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}