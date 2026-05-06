type DashboardCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: "blue" | "green" | "orange" | "red";
};

export default function DashboardCard({
  title,
  value,
  subtitle,
  color = "blue",
}: DashboardCardProps) {
  const colors = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-100",
    },

    green: {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-100",
    },

    orange: {
      bg: "bg-orange-50",
      text: "text-orange-700",
      border: "border-orange-100",
    },

    red: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-100",
    },
  };

  const c = colors[color];

  return (
    <div
      className={`rounded-2xl border ${c.border} ${c.bg} p-6`}
    >
      <p className="text-sm text-gray-500">{title}</p>

      <h2 className={`text-3xl font-bold mt-2 ${c.text}`}>
        {value}
      </h2>

      {subtitle && (
        <p className="text-xs text-gray-400 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}