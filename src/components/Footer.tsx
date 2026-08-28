export default function Footer() {
  return (
    <footer className="max-w-8xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-4">
      <div className="glass-panel rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="text-[#C660CE] font-mono font-bold">&gt;_</span>
          <span>
            <strong className="text-white font-medium">ASCII-FETCH</strong> 
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
          <span>100% Client-Side</span>
          <span>•</span>
          <span>Made by Mohit Giri</span>
        </div>
      </div>
    </footer>
  );
}
