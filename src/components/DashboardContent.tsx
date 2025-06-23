'use client';

import React, { useState } from "react";
import Link from "next/link";
import MemoryModal from "./MemoryModal";
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

export default function DashboardContent({ user, children, memories }: any) {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  const filteredMemories = selectedChildId
    ? memories.filter((mem: any) => mem.childid === selectedChildId)
    : memories;

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

      <main>
        <section className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">Meine Kinder</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {children.length === 0 ? (
              <p className="text-[var(--color-texts)]">Noch keine Kinder hinzugefügt.</p>
            ) : (
              children.map((child: any) => {
                const backgroundColor = child.gender === "Mädchen" ? "#ffeaf4" : "#eaf6ff";

                return (
                  <div
                    key={child.id}
                    className="cursor-pointer rounded-xl p-3 shadow hover:shadow-md transition text-center text-sm"
                    style={{ backgroundColor }}
                    onClick={() => setSelectedChildId(child.id)}
                  >
                    {child.avatar_url ? (
                      <img
                        src={child.avatar_url}
                        alt={child.name}
                        className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-[var(--color-border)] flex items-center justify-center text-xl mx-auto mb-2">
                        {child.name}
                      </div>
                    )}
                    <h2 className="font-semibold text-[var(--color-texts)] uppercase">
                      {child.name}
                    </h2>
                    <p className="text-xs text-[var(--color-text)]">
                      🎂 {new Date(child.birthday).toLocaleDateString()} – {getAge(child.birthday)} Jahre
                    </p>
                    <p className="text-xs text-[var(--color-text)] mt-1">
                      {child.gender}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Alle Erinnerungen</h1>
            {selectedChildId && (
              <button
                onClick={() => setSelectedChildId(null)}
                className="text-sm text-[var(--color-texts)] underline hover:text-[var(--color-headings)]"
              >
                Zurück zu allen Erinnerungen
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedMemory && (
              <MemoryModal
                memory={selectedMemory}
                onClose={() => setSelectedMemory(null)}
              />
            )}

            {filteredMemories.length === 0 ? (
              <p className="text-[var(--color-text)]">Noch keine Erinnerungen vorhanden.</p>
            ) : (
              filteredMemories.map((mem: any) => {
                const child = children.find((child: any) => child.id === mem.childid);
                const gender = child?.gender;
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
                        className="w-60 h-30 object-cover rounded-xl mb-3"
                      />
                    )}
                    <h3 className="text-lg font-semibold text-[var(--color-texts)] capitalize">
                      {child?.name}
                    </h3>
                    <p className="font-semibold text-[var(--color-texts)]">{mem.title}</p>
                    <p className="text-sm text-[var(--color-texts)]">
                      {new Date(mem.date).toLocaleDateString()}
                    </p>
                    <button
                      className="mt-2 text-sm text-[var(--color-texts)] hover:underline hover:text-[var(--color-headings)]"
                      onClick={() => setSelectedMemory(mem)}
                    >
                      Mehr erfahren →
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
