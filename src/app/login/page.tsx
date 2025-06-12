

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-[var(--color-card-bg)] bg-opacity-90 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-[var(--color-primary)] text-center mb-6">
          Anmelden
        </h2>

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-md font-medium text-[var(--color-texts)] mb-1">
              E-Mail-Adresse
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-texts)]"
              placeholder="deine@email.de"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-md font-medium text-[var(--color-texts)] mb-1">
              Passwort
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-[var(--color-border)]
              rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-texts)]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--color-bg-button)] hover:bg-[var(--color-bg-btn-hover)] text-white py-2 rounded-lg text-lg font-medium transition"
          >
            Einloggen
          </button>
        </form>

        <p className="text-sm text-center text-[var(--color-text)] mt-6">
          Noch kein Konto? <a href="/register" className="text-[var(--color-texts)] underline">Registrieren</a>
        </p>
      </div>
    </main>
  );
}
