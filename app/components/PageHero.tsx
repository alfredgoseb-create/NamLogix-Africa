type Stat = {
  value: string | number;
  label: string;
};

type Action = {
  label: string;
  href: string;
  primary?: boolean;
};

type InfoCard = {
  title: string;
  text: string;
};

type PageHeroProps = {
  badge: string;
  titleTop: string;
  titleHighlight: string;
  titleBottom: string;
  description: string;
  actions?: Action[];
  stats?: Stat[];
  infoCards?: InfoCard[];
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
}: PageHeroProps) {
  return (
    <div
      style={{
        background: "#0a1628",
        color: "#fff",
        borderRadius: "0 0 24px 24px",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "3rem 2.5rem 2rem", position: "relative" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.3)",
            color: "#93c5fd",
            fontSize: "12px",
            fontWeight: 500,
            padding: "4px 12px",
            borderRadius: "100px",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              background: "#3b82f6",
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
          {badge}
        </div>

        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            lineHeight: 1.1,
            margin: "0 0 1rem",
          }}
        >
          {titleTop}{" "}
          <span style={{ color: "#f97316" }}>{titleHighlight}</span>
          <br />
          {titleBottom}
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#94a3b8",
            lineHeight: 1.7,
            maxWidth: "560px",
            margin: "0 0 2rem",
          }}
        >
          {description}
        </p>

        {actions.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}
          >
            {actions.map((action) => (
              <a
                key={action.href + action.label}
                href={action.href}
                style={{
                  background: action.primary ? "#f97316" : "transparent",
                  color: "#fff",
                  border: action.primary
                    ? "none"
                    : "1px solid rgba(255,255,255,0.3)",
                  padding: "12px 24px",
                  borderRadius: "100px",
                  fontSize: "14px",
                  fontWeight: action.primary ? 500 : 400,
                  textDecoration: "none",
                }}
              >
                {action.label}
              </a>
            ))}
          </div>
        )}

        {stats.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: "24px", fontWeight: 700 }}>
                  {stat.value}
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    marginTop: "2px",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {infoCards.length > 0 && (
        <div
          style={{
            background: "#0f1f38",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "1.5rem 2rem 2rem",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {infoCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-white/10 bg-[#0a1628] p-4"
              >
                <p className="text-xs text-slate-500">{card.title}</p>
                <p className="text-sm text-slate-200 mt-1">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}