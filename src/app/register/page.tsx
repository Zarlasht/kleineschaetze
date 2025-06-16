"use client";

import {registerUser} from "./action";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-[var(--color-card-bg)] bg-opacity-90 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-[var(--color-primary)] text-center mb-6">
          Registrieren
        </h2>

        <form className="space-y-5" action={registerUser} method="POST">
          <div>
            <label  className="block text-md font-medium text-[var(--color-texts)] mb-1">
              Dein Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-texts)]"
              placeholder="Vor- und Nachname"
              required
            />
          </div>

          <div>
            <label  className="block text-md font-medium text-[var(--color-texts)] mb-1">
              E-Mail-Adresse
            </label>
            <input
              type="email"
              name="email"
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
              name="password"
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-texts)]"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label  className="block text-md font-medium text-[var(--color-texts)] mb-1">
              Passwort bestätigen
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-texts)]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--color-bg-button)] hover:bg-[var(--color-bg-btn-hover)] text-white py-2 rounded-lg text-lg font-medium transition"
          >
            Registrieren
          </button>
        </form>

        <p className="text-sm text-center text-[var(--color-text)] mt-6">
          Schon ein Konto? <a href="/login" className="text-[var(--color-texts)] underline">Jetzt anmelden</a>
        </p>
      </div>
    </main>
  );
}
