import type { ReactNode } from "react";

export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card/90 p-4 shadow-lg shadow-black/20">
      <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-100">{title}</h2>
      {children}
    </section>
  );
}
