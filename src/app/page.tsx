"use client";

import { SearchForm } from "@/components/form/search-form";

export default function Home() {
  return (
    <main className="h-screen w-full bg-slate-900">
      <section className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col gap-3 items-center">
          <SearchForm />
          <p className="text-xs font-light text-muted/40">
            Copyright 2025 - Todos os direitos reservardos
          </p>
        </div>
      </section>
    </main>
  );
}
