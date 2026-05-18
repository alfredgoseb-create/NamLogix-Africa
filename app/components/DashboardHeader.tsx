import Link from "next/link";

type Action = {
  label: string;
  href: string;
  primary?: boolean;
};

type Stat = {
  value: string | number;
  label: string;
};

export default function DashboardHeader({
  badge,
  title,
  description,
  actions = [],
  stats = [],
}: {
  badge?: string;
  title: string;
  description?: string;
  actions?: Action[];
  stats?: Stat[];
}) {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {badge && (
          <p className="text-sm font-black text-orange-600 uppercase tracking-wide">
            {badge}
          </p>
        )}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mt-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900">
              {title}
            </h1>

            {description && (
              <p className="text-gray-500 mt-3 max-w-3xl leading-7">
                {description}
              </p>
            )}
          </div>

          {actions.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={
                    action.primary
                      ? "bg-orange-500 text-white px-5 py-3 rounded-xl font-bold hover:bg-orange-600"
                      : "bg-gray-100 text-gray-800 px-5 py-3 rounded-xl font-bold hover:bg-gray-200"
                  }
                >
                  {action.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {stats.length > 0 && (
          <div className="grid md:grid-cols-4 gap-4 mt-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-4"
              >
                <p className="text-2xl font-black text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}