type DashboardCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: "blue" | "green" | "orange" | "red" | "purple";
};

export default function DashboardCard({
  title,
  value,
  subtitle,
  color = "blue",
}: DashboardCardProps) {
  const colors = {
    blue: {
      bg: "from-blue-600 to-blue-800",
      ring: "ring-blue-100",
      icon: "bg-blue-100 text-blue-700",
    },

    green: {
      bg: "from-emerald-600 to-green-800",
      ring: "ring-green-100",
      icon: "bg-green-100 text-green-700",
    },

    orange: {
      bg: "from-orange-500 to-orange-700",
      ring: "ring-orange-100",
      icon: "bg-orange-100 text-orange-700",
    },

    red: {
      bg: "from-red-500 to-red-700",
      ring: "ring-red-100",
      icon: "bg-red-100 text-red-700",
    },

    purple: {
      bg: "from-purple-600 to-indigo-800",
      ring: "ring-purple-100",
      icon: "bg-purple-100 text-purple-700",
    },
  };

  const c = colors[color];

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl p-6 text-white shadow-lg ring-1 ${c.ring}
        bg-gradient-to-br ${c.bg}
      `}
    >
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-black/10" />

      <div className="relative">
        <p className="text-sm text-white/75">{title}</p>

        <h2 className="text-3xl font-extrabold mt-2">
          {value}
        </h2>

        {subtitle && (
          <p className="text-xs text-white/70 mt-2">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}