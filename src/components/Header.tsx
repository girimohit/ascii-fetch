export default function Header() {
  return (
    <header className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#C660CE] font-mono text-sm font-bold shadow-inner">
            &gt;_
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white tracking-wide flex items-center gap-1.5">
              fastfetch-readme<span className="text-[#C660CE]">.gen</span>
            </h1>
            <p className="text-[11px] text-neutral-400 font-mono">
              terminal-style github bio generator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C660CE] animate-pulse"></span>
            v0.1.0
          </span>
        </div>
      </div>
    </header>
  );
}
