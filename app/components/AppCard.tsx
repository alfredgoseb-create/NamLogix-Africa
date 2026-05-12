import type { ReactNode } from "react";

type AppCardProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  hover?: boolean;
  variant?: "default" | "blue" | "orange" | "green" | "dark";
};

export default function AppCard({
  children,
  className = "",
  id,
  hover = false,
  variant = "default",
}: AppCardProps) {
  const variants = {
    default: "bg-white border-gray-100",
    blue: "bg-gradient-to-br from-blue-50 to-white border-blue-100",
    orange: "bg-gradient-to-br from-orange-50 to-white border-orange-100",
    green: "bg-gradient-to-br from-green-50 to-white border-green-100",
    dark: "bg-gradient-to-br from-[#0a1628] to-[#13233d] border-white/10 text-white",
  };

  return (
    <div
      id={id}
      className={`
        rounded-2xl
        shadow-sm
        border
        p-6
        transition-all
        duration-300
        ${variants[variant]}
        ${hover ? "hover:shadow-xl hover:-translate-y-1" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}