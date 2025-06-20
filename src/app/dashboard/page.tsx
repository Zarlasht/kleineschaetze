import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import sql from "@/lib/db";
import { logout } from "@/app/dashboard/action";

function getAge(birthday: string) {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userid")?.value;

  if (!userId) redirect("/login");

  const [user] = await sql`SELECT name FROM users WHERE id = ${userId}`;

  const children = await sql`
    SELECT id, name, birthday, gender, avatar_url
    FROM children
    WHERE userid = ${userId}
    ORDER BY birthday ASC
  `;

  const memory = await sql`SELECT id , title, image_url , description , date , created_at , childid FROM memories WHERE userid =${userId}
    ORDER BY created_at DESC`;

  const genderMap = new Map(children.map((child) => [child.id, child.gender]));


  return (
    <div className="flex min-h-screen">
      <aside className="w-70 p-6 border-r-2 border-[var(--color-border)] bg-opacity-40 backdrop-blur-sm flex flex-col justify-between">
        <div>
          <p className="text-[var(--color-texts)] text-lg font-medium">
            👋 Hallo, {user?.name || "Mama"}!
          </p>
          <p className="text-sm text-[var(--color-text)] mt-1">
            Schön, dass du da bist. Hier findest du alle Erinnerungen deiner Kinder.
          </p>

          <div className="flex flex-col gap-4 mt-6">
            <Link href="/dashboard/add-child">
              <button className="w-full bg-[var(--color-bg-button)] hover:bg-[var(--color-bg-btn-hover)] text-white py-2 rounded-lg text-md font-medium transition">
                ➕ Kind hinzufügen
              </button>
            </Link>
            <Link href="/dashboard/add-memory">
              <button className="w-full bg-[var(--color-bg-button)] hover:bg-[var(--color-bg-btn-hover)] text-white py-2 rounded-lg text-md font-medium transition">
                ➕ Erinnerung hinzufügen
              </button>
            </Link>
          </div>
        </div>

        <form action={logout} className="mt-6">
          <button
            type="submit"
            className="w-full bg-[var(--color-bg-button)] hover:bg-[var(--color-bg-btn-hover)] text-white py-2 rounded-lg text-md font-medium transition"
          >
            🚪 Abmelden
          </button>
        </form>
      </aside>

      {/* children */}
      <main>
        <section className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6 ]">Meine Kinder</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {children.length === 0 ? (
              <p className="text-[var(--color-text)]">Noch keine Kinder hinzugefügt.</p>
            ) : (
              children.map((child: any) => {
                const backgroundColor = child.gender === "Mädchen" ? "#ffeaf4" : "#eaf6ff";

                return (
                  <Link key={child.id} href={`/dashboard/child/${child.id}`}>
                    <div
                      className="cursor-pointer rounded-2xl p-4 shadow-md hover:shadow-[0_4px_20px_rgba(144,238,144,0.4)] transition"
                      style={{ backgroundColor }}
                    >
                      {child.avatar_url ? (
                        <img
                          src={child.avatar_url}
                          alt={child.name}
                          className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-[var(--color-border)] flex items-center justify-center text-3xl mx-auto mb-4">
                          {child.name.charAt(0)}
                        </div>
                      )}

                      <h2 className="text-xl font-bold text-center text-[var(--color-texts)] uppercase">
                        {child.name}
                      </h2>
                      <p className="text-sm text-center text-[var(--color-text)]">
                        🎂 {new Date(child.birthday).toLocaleDateString()} –{" "}
                        {getAge(child.birthday)} Jahre alt
                      </p>
                      <p className="text-sm text-center text-[var(--color-text)] mt-1">
                        {child.gender}
                      </p>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </section>
        {/*all memories*/}
        <section className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6 ]">Alle Erinnerungen</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {memory.length === 0 ? (
              <p className="text-[var(--color-text)]">Noch keine Erinnerungen hinzugefügt.</p>
            ) : (
              memory.map((mem) => {
                const gender = genderMap.get(mem.child_id);
                const backgroundColor = gender === "Mädchen" ? "#ffeaf4" : "#eaf6ff";

                return (
                  <div
                    key={mem.id}
                    className="rounded-2xl shadow-md p-4 transition hover:shadow-lg"
                    style={{ backgroundColor }}
                  >
                    {mem.image_url && (
                      <img
                        src={mem.image_url}
                        alt={mem.title}
                        className="w-full h-40 object-cover rounded-xl mb-3"
                      />
                    )}
                    <h3 className="text-lg font-semibold text-[var(--color-texts)]">{mem.title}</h3>
                    <p className="text-sm text-[var(--color-text)]">{new Date(mem.date).toLocaleDateString()}</p>
                    <button className="mt-2 text-sm text-blue-500 hover:underline">
                      Mehr erfahren →
                    </button>
                  </div>
                );
              })
            )
            }
          </div>
        </section>


      </main>

    </div>
  );
}
