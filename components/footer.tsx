"use client";

import React from 'react';
import { useSiteTranslations } from "@/lib/use-site-translations";

export default function Footer() {
  const t = useSiteTranslations();
  return (
    <footer className="mb-10 px-4 text-center text-gray-500 dark:text-gray-400">
      <small className="mb-2 block text-xs">
        {t.footerText}
      </small>
      <p className="text-xs">
        <span className="font-semibold">
          Built with ❤️ using Next.js & Tailwind CSS
        </span>
      </p>
    </footer>
  );
}
