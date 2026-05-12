import type { ReactNode } from "react";

type AppCardProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  hover?: boolean;
};

export default function AppCard({
  children,
  className = "",
  id,
  hover = false,
}: AppCardProps) {
  return (
    <div
      id={id}
      className={`
        bg-white
        rounded-2xl
        shadow-sm
        border
        border-gray-100
        p-6
        transition-all
        duration-300
        ${hover ? "hover:shadow-xl hover:-translate-y-1" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}