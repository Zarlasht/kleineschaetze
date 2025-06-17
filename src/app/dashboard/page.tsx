
import Link from "next/link";


export default async function DashboardPage() {


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 border-r">
        <h2 className="text-xl font-semibold mb-4">👩‍👧‍👦 </h2>
        <Link href="/dashboard/add-child">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            ➕ Kind hinzufügen
          </button>
        </Link>
      </aside>

      {/* Children List */}
      <main className="flex-1 p-8 bg-white">
        <h1 className="text-2xl font-bold mb-6">Meine Kinder</h1>
        
      </main>
    </div>
  );
}
