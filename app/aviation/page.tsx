import Link from "next/link";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import PremiumStats from "@/app/components/PremiumStats";

export default function AviationPage() {
  return (
    <PremiumPageShell
      badge="NAMLOGIX AVIATION"
      title="Aviation Services"
      description="Connect with aviation operators for charter flights, cargo air transport, tourism flights, emergency movement, aircraft services, and regional air logistics."
      actions={[
        { label: "Request Aviation Service", href: "/contact", variant: "orange" },
        { label: "Post Cargo", href: "/request-cargo", variant: "blue" },
        { label: "Back Home", href: "/", variant: "white" },
      ]}
    >
      <PremiumStats
        stats={[
          {
            label: "Services",
            value: "Air",
            text: "Cargo, charter and aviation support",
          },
          {
            label: "Region",
            value: "SADC",
            text: "Namibia and Southern Africa routes",
          },
          {
            label: "Use Cases",
            value: "5+",
            text: "Cargo, tourism, medical and business",
          },
        ]}
      />

      <section style={gridStyle}>
        <PremiumCard>
          <div style={iconStyle}>✈️</div>
          <h2 style={cardTitleStyle}>Charter Flights</h2>
          <p style={cardTextStyle}>
            Private and business aviation operators can list charter services
            for tourism, corporate travel, site visits, and regional movement.
          </p>
          <Link href="/contact" style={cardButtonStyle}>
            Request Charter
          </Link>
        </PremiumCard>

        <PremiumCard>
          <div style={iconStyle}>📦</div>
          <h2 style={cardTitleStyle}>Air Cargo</h2>
          <p style={cardTextStyle}>
            Support urgent cargo movement for mining, agriculture, medical,
            retail, cross-border trade, and remote area logistics.
          </p>
          <Link href="/request-cargo" style={cardButtonStyle}>
            Post Air Cargo
          </Link>
        </PremiumCard>

        <PremiumCard>
          <div style={iconStyle}>🏥</div>
          <h2 style={cardTitleStyle}>Medical & Emergency</h2>
          <p style={cardTextStyle}>
            Future expansion can include medical evacuation requests, urgent
            transport support, and emergency aviation coordination.
          </p>
          <Link href="/contact" style={cardButtonStyle}>
            Contact Support
          </Link>
        </PremiumCard>

        <PremiumCard>
          <div style={iconStyle}>🛠️</div>
          <h2 style={cardTitleStyle}>Aircraft Services</h2>
          <p style={cardTextStyle}>
            Aviation companies may later list aircraft support services,
            ground handling, maintenance partners, and operational support.
          </p>
          <Link href="/register" style={cardButtonStyle}>
            Register Provider
          </Link>
        </PremiumCard>
      </section>
    </PremiumPageShell>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 22,
};

const iconStyle = {
  fontSize: 44,
  marginBottom: 18,
};

const cardTitleStyle = {
  fontSize: 24,
  fontWeight: 900,
  marginBottom: 12,
  color: "#0f172a",
};

const cardTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
  marginBottom: 22,
};

const cardButtonStyle = {
  display: "inline-block",
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "12px 16px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
};