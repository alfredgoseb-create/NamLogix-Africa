"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type UserWithRole = {
  id: string;
  email: string;
  role: string;
};

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminAndFetchUsers();
  }, []);

  async function checkAdminAndFetchUsers() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (roleData?.role !== "admin") {
      router.push("/admin/dashboard");
      return;
    }

    await fetchUsers();
  }

  async function fetchUsers() {
    const { data, error } = await supabase.rpc("get_users_with_roles");

    if (error) {
      alert("Failed to fetch users: " + error.message);
    } else {
      setUsers(data || []);
    }

    setLoading(false);
  }

  async function updateRole(userId: string, newRole: string) {
    const { error } = await supabase
      .from("user_roles")
      .upsert({ user_id: userId, role: newRole }, { onConflict: "user_id" });

    if (error) {
      alert("Failed to update role: " + error.message);
    } else {
      fetchUsers();
    }
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>ADMIN USERS</p>

        <h1 style={titleStyle}>User Management</h1>

        <p style={descStyle}>
          Manage staff access, user roles, admin permissions, and platform
          security controls.
        </p>
      </section>

      <section style={containerStyle}>
        <div style={cardStyle}>
          {loading ? (
            <p style={mutedTextStyle}>Loading users...</p>
          ) : users.length === 0 ? (
            <p style={mutedTextStyle}>No users found.</p>
          ) : (
            <div style={listStyle}>
              {users.map((user) => (
                <article key={user.id} style={userCardStyle}>
                  <div>
                    <h3 style={userEmailStyle}>{user.email}</h3>
                    <p style={userIdStyle}>ID: {user.id.slice(0, 8)}...</p>
                  </div>

                  <select
                    value={user.role || "staff"}
                    onChange={(e) => updateRole(user.id, e.target.value)}
                    style={selectStyle}
                  >
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </article>
              ))}
            </div>
          )}
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
  padding: "80px 24px",
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
  maxWidth: 760,
  margin: "0 auto",
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.86)",
  fontSize: 18,
};

const containerStyle = {
  maxWidth: 1000,
  margin: "0 auto",
  padding: "60px 24px",
};

const cardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
};

const mutedTextStyle = {
  color: "#64748b",
  fontWeight: 800,
};

const listStyle = {
  display: "grid",
  gap: 16,
};

const userCardStyle = {
  border: "1px solid #e2e8f0",
  borderRadius: 18,
  padding: 20,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 18,
  flexWrap: "wrap" as const,
};

const userEmailStyle = {
  fontSize: 20,
  fontWeight: 900,
  color: "#0f172a",
  margin: 0,
};

const userIdStyle = {
  color: "#64748b",
  marginTop: 6,
};

const selectStyle = {
  border: "1px solid #cbd5e1",
  borderRadius: 14,
  padding: "10px 14px",
  fontWeight: 900,
  background: "#f8fafc",
};