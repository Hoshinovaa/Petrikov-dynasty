"use client";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a002b] via-[#2b0045] to-[#000] text-white">

      {/* HERO */}
      <section className="text-center pt-24 pb-10 px-6">

        {/* Small Header */}
        <p className="text-sm tracking-[0.4em] text-yellow-400 opacity-70 mb-6">
          A LEGACY • A FAMILY • A JOURNEY
        </p>

        {/* MAIN TITLE */}
        <h1 className="text-[64px] md:text-[96px] font-serif font-bold tracking-wide leading-tight text-yellow-400 drop-shadow-[0_0_25px_rgba(255,200,0,0.6)]">
          PETRIKOV
        </h1>

        {/* SUB TITLE */}
        <p className="text-xl md:text-2xl tracking-widest text-purple-300 mt-2">
          From Russia to San Andreas
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="w-20 h-px bg-yellow-400"></div>
          <div className="w-2 h-2 bg-yellow-400 rotate-45"></div>
          <div className="w-20 h-px bg-yellow-400"></div>
        </div>

        {/* Description */}
        <p className="mt-6 text-purple-200 max-w-xl mx-auto text-sm tracking-wide">
          A story of heritage, power, and legacy across generations.
          From the cold lands of Russia to the streets of San Andreas.
        </p>

        {/* BUTTON (NAIK KE ATAS) */}
        <div className="mt-10">
          <button
            onClick={() => (window.location.href = "/tree")}
            className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-full shadow-[0_0_25px_rgba(255,200,0,0.6)] hover:scale-105 transition"
          >
            View Petrikov Dynasty
          </button>
        </div>

      </section>

    </div>
  );
}