


export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-none text-center px-6 py-10">
      <h1 className="text-4xl font-bold  mb-4">
        Willkommen bei KleineSchätze ✨
      </h1>

      <p className="text-lg  max-w-xl mb-8">
        Halte besondere Momente deiner Kinder fest – ob Zeichnungen, erste Worte
        oder Lieblingszitate – alles an einem sicheren Ort.
      </p>

      <a
        href="/login"
        className="bg-[var(--color-bg-button)] hover:bg-[var(--color-bg-btn-hover)] text-white px-6 py-3 rounded-xl text-lg transition"
      >
        Jetzt starten
      </a>
    </main>
  );
}
