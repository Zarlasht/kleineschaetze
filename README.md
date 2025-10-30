# 🌸 Kleineschätze

Ein digitaler Erinnerungsort für Kinder — entwickelt mit **Next.js**, **TypeScript** und **Tailwind CSS**.  
Eltern können Zeichnungen, Fotos, Meilensteine und Zitate ihrer Kinder sicher speichern und mit Liebe gestalten.

---

## ✨ Features

- **Kinderübersicht:** Zeigt alle Kinder im Dashboard („Meine Kinder“)  
- **Kind-Detailseite:** Beim Klick auf ein Kind werden seine Erinnerungen angezeigt  
- **Designfarben:**  
  - Sanftes Rosa für Mädchen  
  - Sanftes Blau für Jungen  
- **Erinnerungs-Karten:** Mit Bild, Titel und „Mehr sehen“-Button → öffnet ein Modal mit Beschreibung  
- **Mehrsprachigkeit:** Deutsch & Türkisch (geplant: Persisch)  
- **Server Actions:** zum Hinzufügen neuer Kinder  
- **API Routes:** für das Verwalten der Erinnerungen  
- **1:n Datenmodell:** Ein Kind kann viele Erinnerungen besitzen  

---

## 🛠️ Technologien

- [Next.js](https://nextjs.org/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Neon.tech PostgreSQL](https://neon.tech/) (optional)  
- API Routes & Server Actions  

---
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
