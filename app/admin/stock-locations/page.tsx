"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";

type Product = {
  id: string;
  name: string;
  category: string;
  stock_level: number;
  warehouse_id: string | null;
  bin_location: string | null;
};

type Warehouse = {
  id: string;
  name: string;
  code: string;
};

export default function StockLocationsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    warehouse_id: "",
    bin_location: "",
  });

  useEffect(() => {
    checkUser();
    fetchData();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) router.push("/login");
  }

  async function fetchData() {
    setLoading(true);

    const [productsRes, warehousesRes] = await Promise.all([
      supabase
        .from("products")
        .select("id, name, category, stock_level, warehouse_id, bin_location")
        .order("name"),

      supabase
        .from("warehouses")
        .select("id, name, code")
        .eq("is_active", true),
    ]);

    if (productsRes.error) {
      alert("Failed to fetch products: " + productsRes.error.message);
    } else {
      setProducts(productsRes.data || []);
    }

    if (warehousesRes.error) {
      alert("Failed to fetch warehouses: " + warehousesRes.error.message);
    } else {
      setWarehouses(warehousesRes.data || []);
    }

    setLoading(false);
  }

  async function updateStockLocation(
    productId: string,
    warehouseId: string | null,
    binLocation: string | null
  ) {
    const { error } = await supabase
      .from("products")
      .update({
        warehouse_id: warehouseId || null,
        bin_location: binLocation || null,
      })
      .eq("id", productId);

    if (error) {
      alert("Failed to update: " + error.message);
    } else {
      setEditingId(null);
      fetchData();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* 🔥 HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📦 Stock Locations
          </h1>
          <p className="text-gray-500">
            Assign products to warehouses and bin locations.
          </p>
        </div>

        {/* 🔥 CARD CONTAINER */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          {/* TOP BAR */}
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">
              Inventory Mapping
            </h2>
            <span className="text-sm text-gray-500">
              {products.length} products
            </span>
          </div>

          {loading ? (
            <div className="p-6 text-gray-500">Loading data...</div>
          ) : (
            <div className="overflow-x-auto">

              <table className="min-w-full text-sm">

                {/* HEADER */}
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 text-left">Product</th>
                    <th className="px-6 py-3 text-left">Category</th>
                    <th className="px-6 py-3 text-left">Stock</th>
                    <th className="px-6 py-3 text-left">Warehouse</th>
                    <th className="px-6 py-3 text-left">Bin</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>

                {/* BODY */}
                <tbody className="divide-y">

                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition"
                    >

                      {/* PRODUCT */}
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {product.name}
                      </td>

                      {/* CATEGORY */}
                      <td className="px-6 py-4 text-gray-500">
                        {product.category || "—"}
                      </td>

                      {/* STOCK */}
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-semibold">
                          {product.stock_level}
                        </span>
                      </td>

                      {/* WAREHOUSE */}
                      <td className="px-6 py-4">
                        {editingId === product.id ? (
                          <select
                            value={editForm.warehouse_id}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                warehouse_id: e.target.value,
                              })
                            }
                            className="border rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">None</option>
                            {warehouses.map((wh) => (
                              <option key={wh.id} value={wh.id}>
                                {wh.name} ({wh.code})
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-700">
                            {warehouses.find(
                              (w) => w.id === product.warehouse_id
                            )?.name || "—"}
                          </span>
                        )}
                      </td>

                      {/* BIN */}
                      <td className="px-6 py-4">
                        {editingId === product.id ? (
                          <input
                            type="text"
                            value={editForm.bin_location}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                bin_location: e.target.value,
                              })
                            }
                            className="border rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500"
                            placeholder="A-01-02"
                          />
                        ) : (
                          <span className="text-gray-600">
                            {product.bin_location || "—"}
                          </span>
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-4 text-right">
                        {editingId === product.id ? (
                          <div className="flex justify-end gap-3">

                            <button
                              onClick={() =>
                                updateStockLocation(
                                  product.id,
                                  editForm.warehouse_id || null,
                                  editForm.bin_location || null
                                )
                              }
                              className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600"
                            >
                              Save
                            </button>

                            <button
                              onClick={() => setEditingId(null)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              Cancel
                            </button>

                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingId(product.id);
                              setEditForm({
                                warehouse_id: product.warehouse_id || "",
                                bin_location: product.bin_location || "",
                              });
                            }}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Edit
                          </button>
                        )}
                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}