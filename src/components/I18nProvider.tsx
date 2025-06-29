'use client';

import React, { useState, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from "i18next-http-backend";

interface I18nProviderProps {
  children: React.ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    // Check if already initialized
    if (i18next.isInitialized) {
      setIsI18nInitialized(true);
      return;
    }

    // Initialize i18next
    i18next
      .use(LanguageDetector)
      .use(initReactI18next)
      .use(Backend)
      .init(
        {
          debug: true,
          lng: "en", // Default language
          fallbackLng: "en", // Fallback language
          interpolation: {
            escapeValue: false, // React already does escaping
          },
          detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
          },
          backend: {
            loadPath: '/locales/{{lng}}/translation.json',
          },
        },
        (err) => {
          if (err) {
            console.error('i18next initialization failed:', err);
            setInitError(err.message || 'Failed to initialize translations');
          } else {
            console.log('i18next initialized successfully');
            setIsI18nInitialized(true);
          }
        }
      );
  }, []);

  // Show loading state while initializing
  if (!isI18nInitialized && !initError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading translations...</p>
        </div>
      </div>
    );
  }

  // Show error state if initialization failed
  if (initError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600 dark:text-red-400">
          <p className="mb-2">Failed to load translations</p>
          <p className="text-sm opacity-75">{initError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  );
}
