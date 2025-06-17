import { cookies } from "next/headers";
import sql from "@/lib/db";
import Link from "next/link";
import Image from "next/image";

export default async function DashboardPage() {

  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) return <p>Bitte einloggen</p>;

  const [user] = await sql`SELECT * FROM users WHERE id = ${userId}`;
  const children = await sql`SELECT * FROM children WHERE userId = ${userId}`;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 border-r">
        <h2 className="text-xl font-semibold mb-4">👩‍👧‍👦 {user.name}</h2>
        <Link href="/dashboard/add-child">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            ➕ Kind hinzufügen
          </button>
        </Link>
      </aside>

      {/* Children List */}
      <main className="flex-1 p-8 bg-white">
        <h1 className="text-2xl font-bold mb-6">Meine Kinder</h1>
        {children.length === 0 ? (
          <p>Keine Kinder hinzugefügt.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children.map((child: any) => (
              <li key={child.id} className="border p-4 rounded shadow">
                {child.avatar_url && (
                  <Image
                    src={child.avatar_url}
                    alt="Avatar"
                    width={80}
                    height={80}
                    className="rounded-full mb-2"
                  />
                )}
                <h3 className="font-semibold">{child.name}</h3>
                <p>🎂 {child.birthday}</p>
                <p>🚻 {child.gender}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
