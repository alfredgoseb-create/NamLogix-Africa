import Link from "next/link";
import PremiumStats from "@/app/components/PremiumStats";
import PremiumCard from "@/app/components/PremiumCard";
import QuickActions from "@/app/components/QuickActions";
import HowItWorks from "@/app/components/HowItWorks";
import PlatformSections from "@/app/components/PlatformSections";
import PlatformTrust from "@/app/components/PlatformTrust";
import BusinessMetrics from "@/app/components/BusinessMetrics";
import RevenueModel from "@/app/components/RevenueModel";

export default function HomePage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <div style={heroOverlayStyle}>
          <p style={badgeStyle}>NAMLOGIX AFRICA PLATFORM</p>

          <h1 style={titleStyle}>
            Smart Logistics, Cargo, Transport, Warehouse & Trade Marketplace
          </h1>

          <p style={descStyle}>
            Connect cargo owners, transporters, warehouses, suppliers,
            inventory hubs, aviation services, and local transport bookings
            across Namibia and Southern Africa.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/request-cargo" style={primaryButtonStyle}>
              📦 Post Cargo
            </Link>

            <Link href="/transporters" style={secondaryButtonStyle}>
              🚚 Find Transporters
            </Link>

            <Link href="/warehouse-network" style={whiteButtonStyle}>
              🏬 Warehouses
            </Link>

            <Link href="/store" style={whiteButtonStyle}>
              🛒 Visit Store
            </Link>
          </div>
        </div>
      </section>

      <QuickActions />
      <HowItWorks />
      <PlatformSections />
      <PlatformTrust />
      <BusinessMetrics />
      <RevenueModel />

      <section style={containerStyle}>
        <PremiumStats
          stats={[
            {
              label: "Marketplace",
              value: "24/7",
              text: "Cargo, trade & transport access",
            },
            {
              label: "Coverage",
              value: "SADC",
              text: "Regional logistics connectivity",
            },
            {
              label: "Services",
              value: "10+",
              text: "Cargo, transport, warehouse & aviation",
            },
            {
              label: "Platform",
              value: "Smart",
              text: "Modern trade infrastructure",
            },
          ]}
        />

        <section style={gridStyle}>
          <PremiumCard>
            <div style={iconStyle}>📦</div>
            <h2 style={cardTitleStyle}>Cargo Marketplace</h2>
            <p style={cardTextStyle}>
              Businesses and individuals can post cargo requests and receive
              transport bids from drivers and logistics companies.
            </p>
            <Link href="/cargo-requests" style={cardButtonStyle}>
              View Cargo Requests
            </Link>
          </PremiumCard>

          <PremiumCard>
            <div style={iconStyle}>🚚</div>
            <h2 style={cardTitleStyle}>Transporter Network</h2>
            <p style={cardTextStyle}>
              Customers can find trusted transporters, browse service areas, and
              connect with available vehicles and drivers.
            </p>
            <Link href="/transporters" style={cardButtonStyle}>
              Find Transporters
            </Link>
          </PremiumCard>

          <PremiumCard>
            <div style={iconStyle}>🏬</div>
            <h2 style={cardTitleStyle}>Warehouse Network</h2>
            <p style={cardTextStyle}>
              Warehouses can list storage services, hold inventory, support
              fulfillment, and connect stock to transport.
            </p>
            <Link href="/warehouse-network" style={cardButtonStyle}>
              View Warehouses
            </Link>
          </PremiumCard>

          <PremiumCard>
            <div style={iconStyle}>📊</div>
            <h2 style={cardTitleStyle}>Inventory Management</h2>
            <p style={cardTextStyle}>
              Suppliers and warehouses can manage stock, list products, track
              orders, and prepare goods for dispatch.
            </p>
            <Link href="/inventory-management" style={cardButtonStyle}>
              Manage Inventory
            </Link>
          </PremiumCard>

          <PremiumCard>
            <div style={iconStyle}>🏭</div>
            <h2 style={cardTitleStyle}>Supplier Operations</h2>
            <p style={cardTextStyle}>
              Suppliers can register, list products, connect to warehouses, and
              arrange delivery through the logistics network.
            </p>
            <Link href="/supplier-register" style={cardButtonStyle}>
              Register Supplier
            </Link>
          </PremiumCard>

          <PremiumCard>
            <div style={iconStyle}>🛣️</div>
            <h2 style={cardTitleStyle}>Route Planning</h2>
            <p style={cardTextStyle}>
              Plan transport routes, service areas, popular corridors, and
              delivery movements across Namibia.
            </p>
            <Link href="/route-planner" style={cardButtonStyle}>
              Open Route Planner
            </Link>
          </PremiumCard>

          <PremiumCard>
            <div style={iconStyle}>📍</div>
            <h2 style={cardTitleStyle}>Live Tracking</h2>
            <p style={cardTextStyle}>
              Track active trips, cargo movement, transporter progress, and
              customer delivery updates.
            </p>
            <Link href="/live-tracking" style={cardButtonStyle}>
              Track Trips
            </Link>
          </PremiumCard>

          <PremiumCard>
            <div style={iconStyle}>✈️</div>
            <h2 style={cardTitleStyle}>Aviation Services</h2>
            <p style={cardTextStyle}>
              Aviation operators can advertise charter flights, cargo flights,
              tourism routes, and aircraft services.
            </p>
            <Link href="/aviation" style={cardButtonStyle}>
              Explore Aviation
            </Link>
          </PremiumCard>
        </section>

        <section style={ctaStyle}>
          <h2 style={ctaTitleStyle}>
            Building the Future of African Logistics
          </h2>

          <p style={ctaTextStyle}>
            NamLogix Africa combines logistics, transport, warehousing,
            suppliers, inventory, trade, aviation, booking, tracking, and
            marketplace systems into one scalable platform for Namibia and
            Southern Africa.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/register" style={primaryButtonStyle}>
              Create Account
            </Link>

            <Link href="/pricing" style={secondaryButtonStyle}>
              View Pricing
            </Link>

            <Link href="/contact" style={whiteButtonStyle}>
              Contact Team
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

const pageStyle = {
  background: "#f8fafc",
  minHeight: "100vh",
};

const heroStyle = {
  minHeight: "78vh",
  background:
    "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.92), rgba(249,115,22,0.88))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "80px 24px",
};

const heroOverlayStyle = {
  maxWidth: 980,
  textAlign: "center" as const,
  color: "white",
};

const badgeStyle = {
  color: "#fdba74",
  fontWeight: 900,
  letterSpacing: 1.2,
  marginBottom: 18,
};

const titleStyle = {
  fontSize: "clamp(42px, 7vw, 74px)",
  fontWeight: 900,
  lineHeight: 1.05,
  marginBottom: 22,
};

const descStyle = {
  fontSize: 18,
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.86)",
  maxWidth: 820,
  margin: "0 auto",
};

const buttonRowStyle = {
  display: "flex",
  gap: 14,
  justifyContent: "center",
  flexWrap: "wrap" as const,
  marginTop: 34,
};

const primaryButtonStyle = {
  background: "#f97316",
  color: "white",
  padding: "15px 22px",
  borderRadius: 16,
  textDecoration: "none",
  fontWeight: 900,
};

const secondaryButtonStyle = {
  background: "#1d4ed8",
  color: "white",
  padding: "15px 22px",
  borderRadius: 16,
  textDecoration: "none",
  fontWeight: 900,
};

const whiteButtonStyle = {
  background: "white",
  color: "#0f172a",
  padding: "15px 22px",
  borderRadius: 16,
  textDecoration: "none",
  fontWeight: 900,
};

const containerStyle = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "60px 24px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 22,
  marginTop: 34,
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

const ctaStyle = {
  marginTop: 70,
  borderRadius: 30,
  padding: "60px 28px",
  background: "linear-gradient(135deg, #0f172a, #1e40af, #f97316)",
  textAlign: "center" as const,
  color: "white",
};

const ctaTitleStyle = {
  fontSize: 42,
  fontWeight: 900,
  marginBottom: 18,
};

const ctaTextStyle = {
  maxWidth: 820,
  margin: "0 auto",
  color: "rgba(255,255,255,0.86)",
  lineHeight: 1.8,
  fontSize: 17,
};