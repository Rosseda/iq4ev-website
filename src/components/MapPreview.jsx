export default function MapPreview() {
  return (
    <div className="relative h-72 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8fafc_25%,#fff7ed_25%,#fff7ed_50%,#f8fafc_50%,#f8fafc_75%,#fff1f2_75%)] bg-[length:34px_34px]" />

      <div className="absolute left-8 top-8 h-3 w-3 rounded-full bg-green-500 shadow-[0_0_0_8px_rgba(34,197,94,0.16)]" />
      <div className="absolute right-16 top-20 h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_0_8px_rgba(249,115,22,0.16)]" />
      <div className="absolute bottom-16 left-24 h-3 w-3 rounded-full bg-pink-500 shadow-[0_0_0_8px_rgba(236,72,153,0.16)]" />
      <div className="absolute bottom-10 right-10 h-3 w-3 rounded-full bg-red-500 shadow-[0_0_0_8px_rgba(239,68,68,0.16)]" />

      <div className="absolute inset-x-8 top-1/2 h-px bg-slate-300" />
      <div className="absolute inset-y-8 left-1/2 w-px bg-slate-300" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/95 px-6 py-5 text-center shadow-xl">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">
          SA EV Layer
        </p>
        <p className="mt-2 text-3xl font-black text-slate-950">Live-ready</p>
      </div>
    </div>
  );
}