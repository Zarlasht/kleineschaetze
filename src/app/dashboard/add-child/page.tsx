import { addChild } from "./action";

export default function AddChildPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className=" bg-opacity-90 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] text-center mb-2">
          Neues Kind hinzufügen
        </h1>
        <p className="text-sm text-[var(--color-text)] text-center mb-6">
          Bitte fülle die Informationen unten aus.
        </p>

        <form action={addChild} className="space-y-5">
          <div>
            <label className="block text-md font-medium text-[var(--color-texts)] mb-1">
              Name des Kindes
            </label>
            <input
              type="text"
              name="name"
              placeholder="z. B. Lia"
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-texts)]"
              required
            />
          </div>

          <div>
            <label className="block text-md font-medium text-[var(--color-texts)] mb-1">
              Geburtsdatum
            </label>
            <input
              type="date"
              name="birthday"
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-texts)]"
              required
            />
          </div>

          <div>
            <label className="block text-md font-medium text-[var(--color-texts)] mb-1">
              Geschlecht
            </label>
            <select
              name="gender"
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-xl bg-white text-[var(--color-texts)] focus:outline-none focus:ring-2 focus:ring-[var(--color-texts)]"
              required
            >
              <option value="">Bitte auswählen</option>
              <option value="Mädchen">Mädchen</option>
              <option value="Junge">Junge</option>
            </select>
          </div>

          <div>
            <label className="block text-md font-medium text-[var(--color-texts)] mb-1">
              Foto (optional)
            </label>
            <input
              type="file"
              name="avatar_url"
              accept="image/*"
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-xl bg-white text-[var(--color-texts)] file:mr-4 file:py-2 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-bg-button)] file:text-white hover:file:bg-[var(--color-bg-btn-hover)]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--color-bg-button)] hover:bg-[var(--color-bg-btn-hover)] text-white py-2 rounded-xl text-lg font-semibold transition"
          >
            Speichern
          </button>
        </form>
      </div>
    </main>
  );
}
