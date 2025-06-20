import { addMemory } from "./action";
import { cookies } from "next/headers";
import sql from "@/lib/db";
import { use } from "react";
import { redirect } from "next/navigation";

export default async function AddMemoryPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userid")?.value;

    if (!userId) {
        redirect("/login");
    }

    const children = await sql`SELECT id, name FROM children WHERE userid = ${userId} `;


    return (
        <div className="min-h-screen flex justify-center items-start p-8 bg-[var(--color-bg)]">
            <div className="p-8 rounded-3xl shadow-md max-w-lg w-full border border-[var(--color-border)]">
                <h1 className="text-2xl font-bold text-center text-[var(--color-texts)] mb-6">
                    ✨ Neue Erinnerung hinzufügen
                </h1>

                <form action={addMemory} className="space-y-6">
                    <div>
                        <label className="block text-md font-medium text-[var(--color-texts)] mb-1">
                            Für welches Kind?
                        </label>
                        <select
                            name="child_id"
                            required
                            className="w-full p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-light)] text-[var(--color-texts)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border)]"
                        >
                            <option value="" disabled >
                                Bitte wähle ein Kind aus
                            </option>
                            {children.map((c: any) => (
                                <option key={c.id} value={c.id} className="text-[var(--color-texts)] font-semibold">
                                    {c.name}
                                </option>
                            ))}
                        </select>


                    </div>

                    <div>
                        <label className="block text-md font-medium text-[var(--color-texts)] mb-1">
                            Titel der Erinnerung
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="z. B. Erster Schultag"
                            required
                            className="w-full p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border)]"
                        />
                    </div>
                    <div>
                        <label className="block text-md font-medium text-[var(--color-texts)] mb-1">
                            📅 Datum der Erinnerung
                        </label>
                        <input
                            type="date"
                            name="date"
                            required
                            className="w-full p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border)]"
                        />
                    </div>


                    <div>
                        <label className="block text-md font-medium text-[var(--color-texts)] mb-1">
                            Beschreibung
                        </label>
                        <textarea
                            name="description"
                            rows={4}
                            placeholder="Erzähle mehr über diesen Moment..."
                            className="w-full p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border)]"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-md font-medium text-[var(--color-texts)] mb-1">
                            Bild (optional)
                        </label>
                        <input
                            type="file"
                            name="image_url"
                            className="w-full p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border)]"
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-[var(--color-bg-button)] hover:bg-[var(--color-bg-btn-hover)] text-white py-3 px-6 rounded-xl text-md font-semibold transition"
                        >
                            💾 Erinnerung speichern
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
