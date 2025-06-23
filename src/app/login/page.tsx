'use client';

import { useFormState } from 'react-dom';
import { loginUser } from './action';
import { useState, useEffect } from 'react';

const initialState = { error: '' };

export default function LoginPage() {
  const [state, formAction] = useFormState(loginUser, initialState);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (state?.error) {
      setShowModal(true);
    }
  }, [state]);

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 ">
      <div className={`bg-[var(--color-card-bg)] backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md transition-all duration-300 ${showModal ? 'blur-sm scale-[0.98]' : ''}`}>
        <h2 className="text-3xl font-bold text-[var(--color-primary)] text-center mb-6">Anmelden</h2>

        <form className="space-y-5" action={formAction}>
          <div>
            <label className="block text-md font-medium text-[var(--color-texts)] mb-1">E-Mail-Adresse</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-texts)]"
              placeholder="deine@email.de"
              required
            />
          </div>

          <div>
            <label className="block text-md font-medium text-[var(--color-texts)] mb-1">Passwort</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-texts)]"
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
          Noch kein Konto?{' '}
          <a href="/register" className="text-[var(--color-texts)] underline">Registrieren</a>
        </p>
      </div>

      {showModal && (
        <>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10" />

          <div className="absolute z-20 bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-sm mx-auto animate-fade-in">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Fehler</h3>
            <p className="text-sm text-gray-800">{state.error}</p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowModal(false)}
                className=" bg-[var(--color-bg-button)] hover:bg-[var(--color-bg-btn-hover)] text-white rounded-lg text-lg font-medium transition px-4 py-2 "
              >
                Schließen
              </button>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </main>
  );
}
