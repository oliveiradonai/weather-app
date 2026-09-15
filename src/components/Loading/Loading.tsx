import { IconLoader2 } from "@tabler/icons-react";

export function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-20">
      <div className="rounded-lg border border-white/12 bg-slate-950/45 px-6 py-5 text-center shadow-[0_24px_64px_rgba(2,6,23,0.28)] backdrop-blur-xl">
        <IconLoader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-cyan-100" aria-hidden="true" />
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-slate-100">Carregando previsão</p>
      </div>
    </div>
  );
}
