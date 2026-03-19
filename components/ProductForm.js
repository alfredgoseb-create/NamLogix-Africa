import { useState } from 'react';

export default function ProductForm({ initialData = {}, onSubmit, buttonText, loading }) {
  const [name, setName] = useState(initialData.name || '');
  const [quantity, setQuantity] = useState(initialData.quantity || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, quantity: parseInt(quantity) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
        <input
          type="text"
          required
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Solar Panels"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Stock Quantity</label>
        <input
          type="number"
          required
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition disabled:opacity-50"
      >
        {loading ? 'Processing...' : buttonText}
      </button>
    </form>
  );
}