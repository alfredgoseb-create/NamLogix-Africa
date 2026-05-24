"use client";

import Navbar from "@/app/components/Navbar";

const shipments = [
  {
    id: "SHP-001",
    cargo: "Building Materials",
    route: "Windhoek → Walvis Bay",
    transporter: "NamLogix Transport Partner",
    status: "In Transit",
  },
  {
    id: "SHP-002",
    cargo: "Warehouse Stock",
    route: "Okahandja → Windhoek",
    transporter: "Local Delivery Partner",
    status: "Pending Pickup",
  },
];

export default function AdminShipmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-orange-500 font-black tracking-wide">
            ADMIN SHIPMENTS
          </p>

          <h1 className="text-4xl font-black text-gray-900">
            Shipment Management
          </h1>

          <p className="text-gray-600 mt-2">
            Track cargo movement, delivery status, transporter assignments, and
            shipment progress.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {shipments.map((shipment) => (
            <div
              key={shipment.id}
              className="bg-white rounded-2xl shadow border p-6"
            >
              <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold mb-4">
                {shipment.status}
              </div>

              <h2 className="text-2xl font-black text-gray-900">
                {shipment.cargo}
              </h2>

              <p className="text-gray-600 mt-2">
                <strong>Shipment ID:</strong> {shipment.id}
              </p>

              <p className="text-gray-600 mt-2">
                <strong>Route:</strong> {shipment.route}
              </p>

              <p className="text-gray-600 mt-2">
                <strong>Transporter:</strong> {shipment.transporter}
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                <button className="bg-blue-700 text-white px-4 py-2 rounded-xl font-bold">
                  View Details
                </button>

                <button className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold">
                  Mark Delivered
                </button>

                <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-xl font-bold border">
                  Update Status
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}