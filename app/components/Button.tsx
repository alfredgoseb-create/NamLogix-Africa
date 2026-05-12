"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "danger" | "orange";
  fullWidth?: boolean;
};

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  fullWidth = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition shadow-sm";

  const variants = {
    primary:
      "bg-blue-700 text-white hover:bg-blue-800 hover:shadow-lg",

    orange:
      "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg",

    secondary:
      "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 hover:from-gray-200 hover:to-gray-100",

    outline:
      "border border-blue-100 bg-white text-blue-700 hover:bg-blue-50",

    danger:
      "bg-red-50 text-red-600 hover:bg-red-100",
  };

  const width = fullWidth ? "w-full" : "";
  const className = `${base} ${variants[variant]} ${width}`;

  if (href && href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}