import Link from "next/link";

const trackingUpdates = [
  {
    title: "Booking Received",
    time: "09:00",
    description: "Your transport request was received by NamLogix Africa.",
    status: "Completed",
  },
  {
    title: "Transporter Assigned",
    time: "10:30",
    description: "A transporter has been matched to your booking.",
    status: "Completed",
  },
  {
    title: "Vehicle On Route",
    time: "Now",
    description: "The assigned vehicle is currently moving toward the destination.",
    status: "Active",
  },
  {
    title: "Delivery Confirmation",
    time: "Pending",
    description: "Final delivery confirmation will appear here.",
    status: "Pending",
  },
];

export default function CustomerTrackingPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>CUSTOMER TRACKING</p>
        <h1 style={titleStyle}>Track Your Booking</h1>
        <p style={descStyle}>
          Give customers a simple way to follow cargo, ride, warehouse delivery,
          or transport bookings from request to final completion.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/booking-requests" style={primaryButtonStyle}>
            Booking Requests
          </Link>

          <Link href="/live-tracking" style={secondaryButtonStyle}>
            Live Tracking
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={trackingCardStyle}>
          <p style={sectionBadgeStyle}>TRACKING ID</p>
          <h2 style={sectionTitleStyle}>NLA-DEMO-2026-001</h2>
          <p style={sectionTextStyle}>
            This demo timeline shows how customers will see transport progress
            after making a booking.
          </p>

          <div style={timelineStyle}>
            {trackingUpdates.map((item) => (
              <article key={item.title} style={timelineItemStyle}>
                <div style={dotStyle}></div>

                <div style={timelineContentStyle}>
                  <div style={timelineTopStyle}>
                    <h3 style={timelineTitleStyle}>{item.title}</h3>
                    <span style={statusStyle}>{item.status}</span>
                  </div>

                  <p style={timeStyle}>{item.time}</p>
                  <p style={timelineTextStyle}>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f8fafc",
};

const heroStyle = {
  padding: "90px 24px",
  textAlign: "center" as const,
  color: "white",
  background:
    "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.92), rgba(249,115,22,0.88))",
};

const badgeStyle = {
  color: "#fdba74",
  fontWeight: 900,
  letterSpacing: 1,
};

const titleStyle = {
  fontSize: 54,
  fontWeight: 900,
  margin: "10px 0 14px",
};

const descStyle = {
  maxWidth: 820,
  margin: "0 auto",
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.86)",
  fontSize: 18,
};

const buttonRowStyle = {
  display: "flex",
  gap: 14,
  justifyContent: "center",
  flexWrap: "wrap" as const,
  marginTop: 30,
};

const primaryButtonStyle = {
  background: "#f97316",
  color: "white",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const secondaryButtonStyle = {
  background: "white",
  color: "#1d4ed8",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const containerStyle = {
  maxWidth: 900,
  margin: "0 auto",
  padding: "60px 24px",
};

const trackingCardStyle = {
  background: "white",
  borderRadius: 30,
  padding: 34,
  border: "1px solid #e5e7eb",
  boxShadow: "0 16px 40px rgba(15,23,42,0.08)",
};

const sectionBadgeStyle = {
  color: "#f97316",
  fontWeight: 900,
  letterSpacing: 1,
  margin: 0,
};

const sectionTitleStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
  margin: "8px 0",
};

const sectionTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
};

const timelineStyle = {
  marginTop: 34,
  display: "grid",
  gap: 22,
};

const timelineItemStyle = {
  display: "grid",
  gridTemplateColumns: "24px 1fr",
  gap: 16,
};

const dotStyle = {
  width: 16,
  height: 16,
  borderRadius: "50%",
  background: "#f97316",
  marginTop: 8,
};

const timelineContentStyle = {
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
  borderRadius: 22,
  padding: 22,
};

const timelineTopStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap" as const,
};

const timelineTitleStyle = {
  color: "#0f172a",
  fontSize: 21,
  fontWeight: 900,
  margin: 0,
};

const statusStyle = {
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "7px 11px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 12,
};

const timeStyle = {
  color: "#f97316",
  fontWeight: 900,
  margin: "12px 0 6px",
};

const timelineTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
  margin: 0,
};