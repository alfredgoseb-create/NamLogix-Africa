import Layout from '../components/Layout';

const shipments = [
  { id: 'SHP-001', item: 'Solar Panels', destination: 'Oshakati', status: 'In Transit' },
  { id: 'SHP-002', item: 'Steel Rods', destination: 'Walvis Bay', status: 'Delivered' },
];

export default function Shipments() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Active Shipments</h1>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Item</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {shipments.map((ship) => (
              <tr key={ship.id}>
                <td className="px-6 py-4 text-sm font-mono text-blue-600">{ship.id}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{ship.item}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                    {ship.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}