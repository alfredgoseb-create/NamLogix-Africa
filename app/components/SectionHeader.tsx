import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export default function SectionHeader({
  title,
  subtitle,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 mb-3">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
            NamLogix Africa
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          {title}
        </h2>

        {subtitle && (
          <p className="text-sm text-gray-500 mt-2 max-w-2xl leading-6">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}