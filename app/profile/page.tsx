// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import PageHero from "@/app/components/PageHero";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";
import SectionHeader from "@/app/components/SectionHeader";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    full_name: "",
    company_name: "",
    phone: "",
    role: "customer",
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
      });
    }

    setLoading(false);
  }

  async function saveProfile(e) {
    e.preventDefault();

    if (!user) return;

    setSaving(true);

    const { error } = await supabase
      .from("user_profiles")
      .upsert({
        id: user.id,
        full_name: profile.full_name,
        company_name: profile.company_name,
        phone: profile.phone,
        role: profile.role,
      });

    setSaving(false);

    if (error) {
      alert("Failed to save profile: " + error.message);
      return;
    }

    alert("Profile updated successfully.");
  }

  if (loading) {
    return (
      <div className="min-h-screen page-soft-bg flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Account Profile"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="User Dashboard"
        description="Manage your account identity, company details, and platform role."
        actions={[
          { label: "Admin Dashboard", href: "/admin/dashboard", primary: true },
          { label: "Marketplace", href: "/store" },
          { label: "Post Cargo", href: "/request-cargo" },
        ]}
        stats={[
          { value: profile.role, label: "Account role" },
          { value: "Secure", label: "Login status" },
          { value: "Live", label: "Profile system" },
          { value: "B2B", label: "Platform identity" },
        ]}
        infoCards={[
          { title: "Profile", text: "User details" },
          { title: "Company", text: "Business identity" },
          { title: "Role", text: "Access type" },
          { title: "Dashboard", text: "Platform control" },
        ]}
      />

      <div className="max-w-3xl mx-auto px-6 py-10">
        <AppCard variant="blue">
          <SectionHeader
            title="👤 My Profile"
            subtitle="Update your personal and business account details."
          />

          <form onSubmit={saveProfile} className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={profile.full_name}
              onChange={(e) =>
                setProfile({ ...profile, full_name: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Company Name"
              value={profile.company_name}
              onChange={(e) =>
                setProfile({ ...profile, company_name: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />

            <select
              value={profile.role}
              onChange={(e) =>
                setProfile({ ...profile, role: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            >
              <option value="customer">Customer / Cargo Owner</option>
              <option value="supplier">Supplier</option>
              <option value="warehouse">Warehouse</option>
              <option value="transporter">Transporter</option>
              <option value="admin">Admin</option>
            </select>

            <div className="md:col-span-2 bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
              Logged in as: <strong>{user?.email}</strong>
            </div>

            <div className="md:col-span-2">
              <Button type="submit" variant="orange" fullWidth>
                {saving ? "Saving Profile..." : "Save Profile"}
              </Button>
            </div>
          </form>
        </AppCard>
      </div>
    </div>
  );
}