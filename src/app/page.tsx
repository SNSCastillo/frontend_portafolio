'use client';
import Image from "next/image";
import { useTranslation, Trans } from "react-i18next";

const lngs: Record<string, { nativeName: string }> = {
  en: { nativeName: "English" },
  es: { nativeName: "Español" },
}

export default function Home() {
  const { t, i18n } = useTranslation();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 flex items-center justify-between w-full max-w-3xl">
        <div className="gap-2 flex items-center">
          {Object.keys(lngs).map((lng) => (
            <button
              type="submit"
              key={lng}
              className={`px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700
                ${i18n.resolvedLanguage === lng ? 'bg-gray-300 dark:bg-gray-600' : ''}`}
              onClick={() => i18n.changeLanguage(lng)}
              disabled={i18n.resolvedLanguage === lng}
            >
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        <p>
          <Trans i18nKey="description">
            This is a brief description of my work and skills.
          </Trans>
        </p>
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <p>
            {t('welcome')}
          </p>
          
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('contact')}
        </a>
      </footer>
    </div>
  );
}



