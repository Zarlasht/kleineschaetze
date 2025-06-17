import { addChild } from "./action";

export default function AddChildPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Kind hinzufügen</h1>

      <form action={addChild} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          className="w-full border p-2"
          required
        />
        <input
          name="birthday"
          type="date"
          className="w-full border p-2"
          required
        />
        <select name="gender" className="w-full border p-2" required>
          <option value="">Geschlecht wählen</option>
          <option value="Mädchen">Mädchen</option>
          <option value="Junge">Junge</option>
        </select>
        <input
          name="avatar_url"
          placeholder="Avatar URL (optional)"
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Speichern
        </button>
      </form>
    </div>
  );
}
