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

type InfoCard = {
  title: string;
  text: string;
};

export default function PageHero({
  badge,
  titleTop,
  titleHighlight,
  titleBottom,
  description,
  actions = [],
  stats = [],
  infoCards = [],
}: {
  badge?: string;
  titleTop: string;
  titleHighlight?: string;
  titleBottom?: string;
  description?: string;
  actions?: Action[];
  stats?: Stat[];
  infoCards?: InfoCard[];
}) {
  return (
    <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            {badge && (
              <p className="text-sm font-black text-orange-200 uppercase tracking-wide">
                {badge}
              </p>
            )}

            <h1 className="mt-3 text-4xl md:text-5xl font-black leading-tight">
              {titleTop}{" "}
              {titleHighlight && (
                <span className="text-orange-300">{titleHighlight}</span>
              )}
              {titleBottom && (
                <span className="block text-white">{titleBottom}</span>
              )}
            </h1>

            {description && (
              <p className="mt-5 text-white/80 max-w-2xl leading-7">
                {description}
              </p>
            )}

            {actions.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-7">
                {actions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={
                      action.primary
                        ? "bg-orange-500 text-white px-5 py-3 rounded-xl font-bold hover:bg-orange-600"
                        : "bg-white/10 text-white border border-white/20 px-5 py-3 rounded-xl font-bold hover:bg-white/20"
                    }
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white/10 border border-white/15 rounded-3xl p-5 md:p-6 backdrop-blur">
            <div className="grid grid-cols-2 gap-3">
              {infoCards.length > 0
                ? infoCards.map((card) => (
                    <div
                      key={card.title}
                      className="bg-white/10 rounded-2xl p-4 min-h-[105px]"
                    >
                      <p className="font-black text-lg">{card.title}</p>
                      <p className="text-sm text-white/70 mt-2">{card.text}</p>
                    </div>
                  ))
                : stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/10 rounded-2xl p-4 min-h-[105px]"
                    >
                      <p className="font-black text-2xl">{stat.value}</p>
                      <p className="text-sm text-white/70 mt-2">{stat.label}</p>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {stats.length > 0 && (
          <div className="grid md:grid-cols-4 gap-4 mt-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 border border-white/15 rounded-2xl p-4"
              >
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-sm text-white/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}