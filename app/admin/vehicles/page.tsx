"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Vehicle = {
  id: string;
  vehicle_type: string;
  owner_id: string;
  owner_name: string;
  owner_phone: string;
  owner_email: string;
  capacity_kg: number;
  capacity_pax: number;
  registration_number: string;
  license_plate: string;
  make_model: string;
  year: number;
  fuel_type: string;
  current_location: string;
  hourly_rate: number;
  daily_rate: number;
  last_maintenance: string;
  is_available: boolean;
  image_url: string;
  notes: string;
  created_at: string;
};

const vehicleTypes = [
  { value: "truck", label: "Truck", icon: "🚛" },
  { value: "van", label: "Van", icon: "🚐" },
  { value: "plane", label: "Plane", icon: "✈️" },
  { value: "ship", label: "Ship", icon: "🚢" },
  { value: "train", label: "Train", icon: "🚂" },
  { value: "bus", label: "Bus", icon: "🚌" },
];

export default function VehiclesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [filterType, setFilterType] = useState("all");

  const [form, setForm] = useState({
    vehicle_type: "truck",
    owner_name: "",
    owner_phone: "",
    owner_email: "",
    capacity_kg: "",
    capacity_pax: "",
    registration_number: "",
    license_plate: "",
    make_model: "",
    year: "",
    fuel_type: "",
    current_location: "",
    hourly_rate: "",
    daily_rate: "",
    last_maintenance: "",
    is_available: true,
    image_url: "",
    notes: "",
  });

  useEffect(() => {
    checkUser();
    fetchVehicles();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/login");
    }
  }

  async function fetchVehicles() {
    setLoading(true);

    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to fetch vehicles: " + error.message);
    } else {
      setVehicles(data || []);
    }

    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.owner_name || !form.registration_number) {
      alert("Owner name and registration number are required");
      return;
    }

    const payload = {
      vehicle_type: form.vehicle_type,
      owner_name: form.owner_name,
      owner_phone: form.owner_phone || null,
      owner_email: form.owner_email || null,
      capacity_kg: form.capacity_kg ? parseInt(form.capacity_kg) : null,
      capacity_pax: form.capacity_pax ? parseInt(form.capacity_pax) : null,
      registration_number: form.registration_number,
      license_plate: form.license_plate || null,
      make_model: form.make_model || null,
      year: form.year ? parseInt(form.year) : null,
      fuel_type: form.fuel_type || null,
      current_location: form.current_location || null,
      hourly_rate: form.hourly_rate ? parseFloat(form.hourly_rate) : null,
      daily_rate: form.daily_rate ? parseFloat(form.daily_rate) : null,
      last_maintenance: form.last_maintenance || null,
      is_available: form.is_available,
      image_url: form.image_url || null,
      notes: form.notes || null,
    };

    if (editing) {
      const { error } = await supabase
        .from("vehicles")
        .update(payload)
        .eq("id", editing.id);

      if (error) {
        alert("Failed to update: " + error.message);
      } else {
        setShowForm(false);
        setEditing(null);
        fetchVehicles();
      }
    } else {
      const { error } = await supabase.from("vehicles").insert([payload]);

      if (error) {
        alert("Failed to create: " + error.message);
      } else {
        setShowForm(false);
        resetForm();
        fetchVehicles();
      }
    }
  }

  async function toggleAvailability(id: string, current: boolean) {
    const { error } = await supabase
      .from("vehicles")
      .update({ is_available: !current })
      .eq("id", id);

    if (error) {
      alert("Failed to update: " + error.message);
    } else {
      fetchVehicles();
    }
  }

  async function deleteVehicle(id: string) {
    if (!confirm("Delete this vehicle?")) return;

    const { error } = await supabase.from("vehicles").delete().eq("id", id);

    if (error) {
      alert("Failed to delete: " + error.message);
    } else {
      fetchVehicles();
    }
  }

  function resetForm() {
    setForm({
      vehicle_type: "truck",
      owner_name: "",
      owner_phone: "",
      owner_email: "",
      capacity_kg: "",
      capacity_pax: "",
      registration_number: "",
      license_plate: "",
      make_model: "",
      year: "",
      fuel_type: "",
      current_location: "",
      hourly_rate: "",
      daily_rate: "",
      last_maintenance: "",
      is_available: true,
      image_url: "",
      notes: "",
    });
  }

  function startEdit(vehicle: Vehicle) {
    setEditing(vehicle);
    setForm({
      vehicle_type: vehicle.vehicle_type,
      owner_name: vehicle.owner_name || "",
      owner_phone: vehicle.owner_phone || "",
      owner_email: vehicle.owner_email || "",
      capacity_kg: vehicle.capacity_kg?.toString() || "",
      capacity_pax: vehicle.capacity_pax?.toString() || "",
      registration_number: vehicle.registration_number || "",
      license_plate: vehicle.license_plate || "",
      make_model: vehicle.make_model || "",
      year: vehicle.year?.toString() || "",
      fuel_type: vehicle.fuel_type || "",
      current_location: vehicle.current_location || "",
      hourly_rate: vehicle.hourly_rate?.toString() || "",
      daily_rate: vehicle.daily_rate?.toString() || "",
      last_maintenance: vehicle.last_maintenance || "",
      is_available: vehicle.is_available,
      image_url: vehicle.image_url || "",
      notes: vehicle.notes || "",
    });
    setShowForm(true);
  }

  function getTypeIcon(type: string) {
    return vehicleTypes.find((item) => item.value === type)?.icon || "🚛";
  }

  const filteredVehicles =
    filterType === "all"
      ? vehicles
      : vehicles.filter((vehicle) => vehicle.vehicle_type === filterType);

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>ADMIN VEHICLES</p>

        <h1 style={titleStyle}>Vehicle Management</h1>

        <p style={descStyle}>
          Manage trucks, vans, buses, planes, ships, and trains for cargo and
          passenger transport.
        </p>

        <button
          onClick={() => {
            resetForm();
            setEditing(null);
            setShowForm(true);
          }}
          style={primaryButtonStyle}
        >
          + Register Vehicle
        </button>
      </section>

      <section style={containerStyle}>
        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Vehicles</p>
            <h3 style={statValueStyle}>{vehicles.length}</h3>
            <p style={statTextStyle}>Total registered fleet</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Available</p>
            <h3 style={statValueStyle}>
              {vehicles.filter((vehicle) => vehicle.is_available).length}
            </h3>
            <p style={statTextStyle}>Ready for service</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Unavailable</p>
            <h3 style={statValueStyle}>
              {vehicles.filter((vehicle) => !vehicle.is_available).length}
            </h3>
            <p style={statTextStyle}>Not currently active</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Types</p>
            <h3 style={statValueStyle}>{vehicleTypes.length}</h3>
            <p style={statTextStyle}>Transport categories</p>
          </div>
        </div>

        <div style={filterBarStyle}>
          <button
            onClick={() => setFilterType("all")}
            style={filterType === "all" ? activeFilterStyle : filterStyle}
          >
            All ({vehicles.length})
          </button>

          {vehicleTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setFilterType(type.value)}
              style={filterType === type.value ? activeFilterStyle : filterStyle}
            >
              {type.icon} {type.label} (
              {vehicles.filter((vehicle) => vehicle.vehicle_type === type.value).length}
              )
            </button>
          ))}
        </div>

        {loading ? (
          <div style={emptyStyle}>Loading vehicles...</div>
        ) : filteredVehicles.length === 0 ? (
          <div style={emptyStyle}>
            No vehicles registered. Click Register Vehicle to add one.
          </div>
        ) : (
          <div style={gridStyle}>
            {filteredVehicles.map((vehicle) => (
              <article key={vehicle.id} style={cardStyle}>
                <div style={cardTopStyle}>
                  <div style={vehicleTypeStyle}>
                    <span style={vehicleIconStyle}>
                      {getTypeIcon(vehicle.vehicle_type)}
                    </span>

                    <span style={vehicleTypeTextStyle}>
                      {vehicle.vehicle_type}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      toggleAvailability(vehicle.id, vehicle.is_available)
                    }
                    style={
                      vehicle.is_available
                        ? availableStatusStyle
                        : unavailableStatusStyle
                    }
                  >
                    {vehicle.is_available ? "Available" : "Unavailable"}
                  </button>
                </div>

                <div style={cardBodyStyle}>
                  <h3 style={cardTitleStyle}>
                    {vehicle.make_model || vehicle.registration_number}
                  </h3>

                  <p style={cardTextStyle}>
                    <strong>Registration:</strong> {vehicle.registration_number}
                  </p>

                  {vehicle.license_plate && (
                    <p style={cardTextStyle}>
                      <strong>Plate:</strong> {vehicle.license_plate}
                    </p>
                  )}

                  <p style={cardTextStyle}>
                    <strong>Owner:</strong> {vehicle.owner_name}
                  </p>

                  {vehicle.owner_phone && (
                    <p style={cardTextStyle}>
                      <strong>Phone:</strong> {vehicle.owner_phone}
                    </p>
                  )}

                  <div style={tagWrapStyle}>
                    {vehicle.capacity_kg && (
                      <span style={tagStyle}>
                        📦 {vehicle.capacity_kg.toLocaleString()} kg
                      </span>
                    )}

                    {vehicle.capacity_pax && (
                      <span style={tagStyle}>👥 {vehicle.capacity_pax} pax</span>
                    )}

                    {vehicle.current_location && (
                      <span style={tagStyle}>
                        📍 {vehicle.current_location}
                      </span>
                    )}
                  </div>

                  <div style={rateWrapStyle}>
                    {vehicle.hourly_rate && (
                      <span style={rateStyle}>N${vehicle.hourly_rate}/hr</span>
                    )}

                    {vehicle.daily_rate && (
                      <span style={rateStyle}>N${vehicle.daily_rate}/day</span>
                    )}
                  </div>

                  {vehicle.notes && (
                    <p style={notesStyle}>{vehicle.notes}</p>
                  )}
                </div>

                <div style={cardFooterStyle}>
                  <button onClick={() => startEdit(vehicle)} style={editButtonStyle}>
                    Edit
                  </button>

                  <button
                    onClick={() => deleteVehicle(vehicle.id)}
                    style={deleteButtonStyle}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {showForm && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2 style={modalTitleStyle}>
              {editing ? "Edit Vehicle" : "Register New Vehicle"}
            </h2>

            <form onSubmit={handleSubmit} style={formStyle}>
              <div style={formGridStyle}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Vehicle Type *</label>
                  <select
                    value={form.vehicle_type}
                    onChange={(e) =>
                      setForm({ ...form, vehicle_type: e.target.value })
                    }
                    style={inputStyle}
                  >
                    {vehicleTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Registration Number *</label>
                  <input
                    type="text"
                    value={form.registration_number}
                    onChange={(e) =>
                      setForm({ ...form, registration_number: e.target.value })
                    }
                    style={inputStyle}
                    required
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Owner Name *</label>
                  <input
                    type="text"
                    value={form.owner_name}
                    onChange={(e) =>
                      setForm({ ...form, owner_name: e.target.value })
                    }
                    style={inputStyle}
                    required
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Phone</label>
                  <input
                    type="tel"
                    value={form.owner_phone}
                    onChange={(e) =>
                      setForm({ ...form, owner_phone: e.target.value })
                    }
                    style={inputStyle}
                  />
                </div>

                <div style={fullFieldStyle}>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    value={form.owner_email}
                    onChange={(e) =>
                      setForm({ ...form, owner_email: e.target.value })
                    }
                    style={inputStyle}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Make / Model</label>
                  <input
                    type="text"
                    value={form.make_model}
                    onChange={(e) =>
                      setForm({ ...form, make_model: e.target.value })
                    }
                    style={inputStyle}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Year</label>
                  <input
                    type="number"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Cargo Capacity KG</label>
                  <input
                    type="number"
                    value={form.capacity_kg}
                    onChange={(e) =>
                      setForm({ ...form, capacity_kg: e.target.value })
                    }
                    style={inputStyle}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Passenger Capacity</label>
                  <input
                    type="number"
                    value={form.capacity_pax}
                    onChange={(e) =>
                      setForm({ ...form, capacity_pax: e.target.value })
                    }
                    style={inputStyle}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Hourly Rate N$</label>
                  <input
                    type="number"
                    value={form.hourly_rate}
                    onChange={(e) =>
                      setForm({ ...form, hourly_rate: e.target.value })
                    }
                    style={inputStyle}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Daily Rate N$</label>
                  <input
                    type="number"
                    value={form.daily_rate}
                    onChange={(e) =>
                      setForm({ ...form, daily_rate: e.target.value })
                    }
                    style={inputStyle}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Current Location</label>
                  <input
                    type="text"
                    value={form.current_location}
                    onChange={(e) =>
                      setForm({ ...form, current_location: e.target.value })
                    }
                    style={inputStyle}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Last Maintenance</label>
                  <input
                    type="date"
                    value={form.last_maintenance}
                    onChange={(e) =>
                      setForm({ ...form, last_maintenance: e.target.value })
                    }
                    style={inputStyle}
                  />
                </div>

                <div style={fullFieldStyle}>
                  <label style={labelStyle}>Image URL</label>
                  <input
                    type="url"
                    value={form.image_url}
                    onChange={(e) =>
                      setForm({ ...form, image_url: e.target.value })
                    }
                    style={inputStyle}
                  />
                </div>

                <div style={fullFieldStyle}>
                  <label style={labelStyle}>Notes</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    style={textareaStyle}
                  />
                </div>

                <div style={fullFieldStyle}>
                  <label style={checkStyle}>
                    <input
                      type="checkbox"
                      checked={form.is_available}
                      onChange={(e) =>
                        setForm({ ...form, is_available: e.target.checked })
                      }
                    />
                    Available for hire
                  </label>
                </div>
              </div>

              <div style={modalButtonRowStyle}>
                <button type="submit" style={saveButtonStyle}>
                  {editing ? "Save Changes" : "Register Vehicle"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={cancelButtonStyle}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
  margin: "8px 0 14px",
};

const descStyle = {
  maxWidth: 820,
  margin: "0 auto 28px",
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.86)",
  fontSize: 18,
};

const primaryButtonStyle = {
  background: "#f97316",
  color: "white",
  border: "none",
  padding: "14px 20px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};

const containerStyle = {
  maxWidth: 1300,
  margin: "0 auto",
  padding: "60px 24px",
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20,
  marginBottom: 30,
};

const statCardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 24,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const statLabelStyle = {
  color: "#64748b",
  fontWeight: 900,
  margin: 0,
};

const statValueStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
  margin: "8px 0",
};

const statTextStyle = {
  color: "#64748b",
  margin: 0,
};

const filterBarStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: 10,
  marginBottom: 28,
};

const filterStyle = {
  background: "white",
  color: "#475569",
  border: "1px solid #e2e8f0",
  padding: "10px 14px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};

const activeFilterStyle = {
  ...filterStyle,
  background: "#1d4ed8",
  color: "white",
};

const emptyStyle = {
  background: "white",
  borderRadius: 24,
  padding: 32,
  textAlign: "center" as const,
  color: "#64748b",
  fontWeight: 800,
  border: "1px solid #e5e7eb",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 26,
  overflow: "hidden",
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
};

const cardTopStyle = {
  padding: 18,
  background: "#f8fafc",
  borderBottom: "1px solid #e5e7eb",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
};

const vehicleTypeStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const vehicleIconStyle = {
  fontSize: 28,
};

const vehicleTypeTextStyle = {
  color: "#334155",
  fontWeight: 900,
  textTransform: "uppercase" as const,
  fontSize: 13,
};

const availableStatusStyle = {
  background: "#dcfce7",
  color: "#15803d",
  border: "none",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  cursor: "pointer",
};

const unavailableStatusStyle = {
  ...availableStatusStyle,
  background: "#fee2e2",
  color: "#b91c1c",
};

const cardBodyStyle = {
  padding: 22,
};

const cardTitleStyle = {
  fontSize: 24,
  fontWeight: 900,
  color: "#0f172a",
  margin: "0 0 8px",
};

const cardTextStyle = {
  color: "#475569",
  lineHeight: 1.6,
  margin: "6px 0",
};

const tagWrapStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: 8,
  marginTop: 14,
};

const tagStyle = {
  background: "#f1f5f9",
  color: "#334155",
  padding: "7px 10px",
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 800,
};

const rateWrapStyle = {
  display: "flex",
  gap: 12,
  marginTop: 14,
  flexWrap: "wrap" as const,
};

const rateStyle = {
  color: "#16a34a",
  fontWeight: 900,
};

const notesStyle = {
  color: "#94a3b8",
  marginTop: 12,
  fontSize: 13,
};

const cardFooterStyle = {
  borderTop: "1px solid #e5e7eb",
  padding: 16,
  background: "#f8fafc",
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
};

const editButtonStyle = {
  background: "#eff6ff",
  color: "#1d4ed8",
  border: "1px solid #bfdbfe",
  padding: "9px 13px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};

const deleteButtonStyle = {
  background: "#fee2e2",
  color: "#b91c1c",
  border: "1px solid #fecaca",
  padding: "9px 13px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};

const modalOverlayStyle = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(15,23,42,0.72)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  zIndex: 100,
};

const modalStyle = {
  background: "white",
  borderRadius: 28,
  width: "100%",
  maxWidth: 820,
  maxHeight: "90vh",
  overflowY: "auto" as const,
  padding: 30,
};

const modalTitleStyle = {
  fontSize: 28,
  fontWeight: 900,
  color: "#0f172a",
  marginBottom: 20,
};

const formStyle = {
  display: "grid",
  gap: 20,
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 18,
};

const fieldStyle = {
  display: "grid",
  gap: 8,
};

const fullFieldStyle = {
  display: "grid",
  gap: 8,
  gridColumn: "1 / -1",
};

const labelStyle = {
  color: "#334155",
  fontWeight: 900,
};

const inputStyle = {
  width: "100%",
  border: "1px solid #cbd5e1",
  borderRadius: 14,
  padding: "12px 14px",
  fontSize: 15,
};

const textareaStyle = {
  ...inputStyle,
  minHeight: 90,
};

const checkStyle = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  color: "#334155",
  fontWeight: 900,
};

const modalButtonRowStyle = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap" as const,
};

const saveButtonStyle = {
  flex: 1,
  background: "#1d4ed8",
  color: "white",
  border: "none",
  padding: "13px 18px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};

const cancelButtonStyle = {
  flex: 1,
  background: "#e5e7eb",
  color: "#334155",
  border: "none",
  padding: "13px 18px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};