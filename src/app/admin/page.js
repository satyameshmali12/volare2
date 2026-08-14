export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

        <p className="mt-2 text-gray-500">Manage your Team Volare website.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <p className="text-sm text-gray-500">Total Users</p>

          <h2 className="text-3xl font-bold mt-2">1</h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <p className="text-sm text-gray-500">Messages</p>

          <h2 className="text-3xl font-bold mt-2">0</h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <p className="text-sm text-gray-500">Database</p>

          <h2 className="text-lg font-semibold mt-3 text-green-600">
            Connected
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <p className="text-sm text-gray-500">Access</p>

          <h2 className="text-lg font-semibold mt-3">Super Admin</h2>
        </div>
      </div>
    </div>
  );
}
