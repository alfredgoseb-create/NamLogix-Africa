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
      user.id + "-" + Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9.-]/g, "_");

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
    return (
      <div className="min-h-screen page-soft-bg flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Business Profile"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Company Identity"
        description="Manage your profile, company logo, banner image, contact details, and platform role."
        actions={[
          { label: "Admin Dashboard", href: "/admin/dashboard", primary: true },
          { label: "Marketplace", href: "/store" },
          { label: "Post Cargo", href: "/request-cargo" },
        ]}
        stats={[
          { value: profile.role, label: "Account role" },
          { value: profile.logo_url ? "Yes" : "No", label: "Logo uploaded" },
          { value: profile.banner_url ? "Yes" : "No", label: "Banner uploaded" },
          { value: "B2B", label: "Business profile" },
        ]}
        infoCards={[
          { title: "Logo", text: "Company branding" },
          { title: "Banner", text: "Profile cover image" },
          { title: "Company", text: "Business identity" },
          { title: "Role", text: "Access type" },
        ]}
      />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <AppCard variant="blue" className="mb-8">
          <div className="relative rounded-3xl overflow-hidden bg-gray-100 min-h-56">
            {profile.banner_url ? (
              <img
                src={profile.banner_url}
                alt="Company banner"
                className="w-full h-56 object-cover"
              />
            ) : (
              <div className="h-56 bg-gradient-to-r from-blue-900 to-orange-500 flex items-center justify-center text-white font-black text-3xl">
                Company Banner
              </div>
            )}

            <div className="absolute left-6 -bottom-0 translate-y-1/2">
              {profile.logo_url ? (
                <img
                  src={profile.logo_url}
                  alt="Company logo"
                  className="h-28 w-28 object-cover rounded-3xl border-4 border-white shadow-xl bg-white"
                />
              ) : (
                <div className="h-28 w-28 rounded-3xl border-4 border-white shadow-xl bg-white flex items-center justify-center text-4xl">
                  🏢
                </div>
              )}
            </div>
          </div>

          <div className="pt-20">
            <h2 className="text-3xl font-black text-gray-900">
              {profile.company_name || profile.full_name || "Your Company"}
            </h2>

            <p className="text-gray-500 mt-2">
              Logged in as: <strong>{user?.email}</strong>
            </p>
          </div>
        </AppCard>

        <AppCard variant="orange">
          <SectionHeader
            title="👤 Edit Business Profile"
            subtitle="Upload your company logo and banner, then save your profile."
          />

          <form onSubmit={saveProfile} className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-sm font-bold text-gray-700 mb-2 block">
                Company Logo
              </label>

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
                className="w-full border rounded-xl px-4 py-3 bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-bold text-gray-700 mb-2 block">
                Company Banner
              </label>

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
                className="w-full border rounded-xl px-4 py-3 bg-white"
              />
            </div>

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

            <div className="md:col-span-2">
              <Button type="submit" variant="orange" fullWidth>
                {saving ? "Saving Profile..." : "Save Business Profile"}
              </Button>
            </div>
          </form>
        </AppCard>
      </div>
    </div>
  );
}