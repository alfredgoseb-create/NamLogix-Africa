// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState({
    full_name: "",
    company_name: "",
    phone: "",
    role: "customer",
    logo_url: "",
    banner_url: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    setUser(userData.user);

    const { data } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userData.user.id)
      .single();

    if (data) {
      setProfile({
        full_name: data.full_name || "",
        company_name: data.company_name || "",
        phone: data.phone || "",
        role: data.role || "customer",
        logo_url: data.logo_url || "",
        banner_url: data.banner_url || "",
      });
    }

    setLoading(false);
  }

  async function uploadFile(file, bucketName) {
    if (!file || !user) return null;

    const fileName =
      user.id +
      "-" +
      Date.now() +
      "-" +
      file.name.replace(/[^a-zA-Z0-9.-]/g, "_");

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file);

    if (error) {
      alert("Upload failed: " + error.message);
      return null;
    }

    const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function saveProfile(e) {
    e.preventDefault();

    if (!user) return;

    setSaving(true);

    const { error } = await supabase.from("user_profiles").upsert({
      id: user.id,
      full_name: profile.full_name,
      company_name: profile.company_name,
      phone: profile.phone,
      role: profile.role,
      logo_url: profile.logo_url,
      banner_url: profile.banner_url,
    });

    setSaving(false);

    if (error) {
      alert("Failed to save profile: " + error.message);
      return;
    }

    alert("Profile updated successfully.");
  }

  if (loading) {
    return <CenterText text="Loading profile..." />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fc", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <section style={heroStyle}>
          <p style={{ color: "#fed7aa", fontWeight: 800 }}>BUSINESS PROFILE</p>

          <h1 style={{ fontSize: 42, fontWeight: 900, margin: "10px 0" }}>
            Company Identity
          </h1>

          <p style={{ maxWidth: 720, lineHeight: 1.7 }}>
            Manage your profile, company logo, banner image, contact details, and platform role.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <Link href="/admin/dashboard" style={buttonPrimary}>
              Admin Dashboard
            </Link>

            <Link href="/store" style={buttonSecondary}>
              Marketplace
            </Link>

            <Link href="/request-cargo" style={buttonOrange}>
              Post Cargo
            </Link>
          </div>
        </section>

        <section style={cardStyle}>
          <div style={{ position: "relative" }}>
            {profile.banner_url ? (
              <img
                src={profile.banner_url}
                alt="Company banner"
                style={{
                  width: "100%",
                  height: 240,
                  objectFit: "cover",
                  borderRadius: 24,
                  display: "block",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: 240,
                  borderRadius: 24,
                  background: "linear-gradient(135deg, #1e3a8a, #f97316)",
                  color: "white",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 28,
                  fontWeight: 900,
                }}
              >
                Company Banner
              </div>
            )}

            <div style={{ position: "absolute", left: 24, bottom: -50 }}>
              {profile.logo_url ? (
                <img
                  src={profile.logo_url}
                  alt="Company logo"
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 22,
                    border: "5px solid white",
                    background: "white",
                    boxShadow: "0 12px 26px rgba(15,23,42,0.24)",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 22,
                    border: "5px solid white",
                    background: "white",
                    boxShadow: "0 12px 26px rgba(15,23,42,0.24)",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 40,
                  }}
                >
                  🏢
                </div>
              )}
            </div>
          </div>

          <div style={{ paddingTop: 70 }}>
            <span style={pillStyle}>{profile.role || "customer"}</span>

            <h2 style={{ fontSize: 32, fontWeight: 900, margin: "12px 0 6px" }}>
              {profile.company_name || profile.full_name || "Your Company"}
            </h2>

            <p style={{ color: "#64748b" }}>
              Logged in as: <strong>{user?.email}</strong>
            </p>
          </div>
        </section>

        <section style={{ ...cardStyle, marginTop: 24 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}>
            👤 Edit Business Profile
          </h2>

          <p style={{ color: "#64748b", marginTop: 8 }}>
            Upload your company logo and banner, then save your profile.
          </p>

          <form onSubmit={saveProfile} style={formGrid}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Company Logo</label>

              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  const url = await uploadFile(file, "profile-logos");

                  if (url) {
                    setProfile({ ...profile, logo_url: url });
                  }
                }}
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Company Banner</label>

              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  const url = await uploadFile(file, "profile-banners");

                  if (url) {
                    setProfile({ ...profile, banner_url: url });
                  }
                }}
                style={inputStyle}
              />
            </div>

            <input
              type="text"
              placeholder="Full Name"
              value={profile.full_name}
              onChange={(e) =>
                setProfile({ ...profile, full_name: e.target.value })
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Company Name"
              value={profile.company_name}
              onChange={(e) =>
                setProfile({ ...profile, company_name: e.target.value })
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              style={inputStyle}
            />

            <select
              value={profile.role}
              onChange={(e) =>
                setProfile({ ...profile, role: e.target.value })
              }
              style={inputStyle}
            >
              <option value="customer">Customer / Cargo Owner</option>
              <option value="supplier">Supplier</option>
              <option value="warehouse">Warehouse</option>
              <option value="transporter">Transporter</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              disabled={saving}
              style={{
                ...buttonOrange,
                border: "none",
                cursor: "pointer",
                gridColumn: "1 / -1",
              }}
            >
              {saving ? "Saving Profile..." : "Save Business Profile"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

function CenterText({ text }) {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      {text}
    </div>
  );
}

const heroStyle = {
  background: "linear-gradient(135deg, #0b1220, #1e3a8a, #f97316)",
  color: "white",
  borderRadius: 28,
  padding: 36,
  marginBottom: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 24,
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 16,
  marginTop: 24,
};

const inputStyle = {
  width: "100%",
  border: "1px solid #d1d5db",
  borderRadius: 14,
  padding: "13px 14px",
  fontSize: 15,
  background: "white",
};

const labelStyle = {
  display: "block",
  fontWeight: 800,
  color: "#374151",
  marginBottom: 8,
};

const pillStyle = {
  display: "inline-block",
  background: "#dbeafe",
  color: "#1d4ed8",
  padding: "6px 12px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 800,
  textTransform: "capitalize",
};

const buttonPrimary = {
  background: "#1d4ed8",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonSecondary = {
  background: "white",
  color: "#1d4ed8",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonOrange = {
  background: "#f97316",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};