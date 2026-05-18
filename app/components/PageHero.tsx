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
    <section className="w-full overflow-hidden bg-gradient-to-br from-slate-950 via-blue-900 to-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-8">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          
          {/* LEFT SIDE */}
          <div>
            {badge && (
              <p className="text-xs md:text-sm font-black uppercase tracking-wider text-orange-200">
                {badge}
              </p>
            )}

            <h1 className="mt-2 text-3xl md:text-4xl font-black leading-tight">
              {titleTop}{" "}
              {titleHighlight && (
                <span className="text-orange-300">
                  {titleHighlight}
                </span>
              )}

              {titleBottom && (
                <span className="block">
                  {titleBottom}
                </span>
              )}
            </h1>

            {description && (
              <p className="mt-4 max-w-2xl text-sm md:text-base leading-7 text-white/80">
                {description}
              </p>
            )}

            {actions.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-5">
                {actions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={
                      action.primary
                        ? "bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition"
                        : "bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold transition"
                    }
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          {(infoCards.length > 0 || stats.length > 0) && (
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-3">
                {(infoCards.length > 0
                  ? infoCards
                  : stats
                )
                  .slice(0, 4)
                  .map((item: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white/10 border border-white/15 backdrop-blur rounded-2xl p-4"
                    >
                      <p className="font-black text-lg">
                        {item.title || item.value}
                      </p>

                      <p className="text-xs text-white/70 mt-1 leading-6">
                        {item.text || item.label}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM STATS */}
        {stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {stats.slice(0, 4).map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 border border-white/15 rounded-2xl p-3"
              >
                <p className="text-xl font-black">
                  {stat.value}
                </p>

                <p className="text-xs text-white/70 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}