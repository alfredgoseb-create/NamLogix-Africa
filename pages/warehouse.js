import Layout from '../components/Layout';

export default function Warehouse() {
  const warehouses = [
    { id: 1, name: 'Windhoek Hub', status: 'Active', capacity: '85%' },
    { id: 2, name: 'Walvis Bay Port', status: 'Active', capacity: '40%' }
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Warehouse Management</h1>
      <div className="grid gap-4">
        {warehouses.map((w) => (
          <div key={w.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{w.name}</h3>
              <p className="text-green-600 font-semibold text-sm">{w.status}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase font-bold">Capacity</p>
              <p className="text-xl font-bold text-blue-600">{w.capacity}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}