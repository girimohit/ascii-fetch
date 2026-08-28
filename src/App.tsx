import Header from './components/Header';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <Header />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Configuration & Editor */}
          <section className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-6">
              <h2 className="text-lg font-medium text-white mb-1">Configuration</h2>
              <p className="text-xs text-neutral-400 mb-6">
                Customize your profile
              </p>
              
              <div className="text-xs text-neutral-500 border border-dashed border-white/10 rounded-xl p-8 text-center">
                Editor controls
              </div>
            </div>
          </section>

          {/* Right Column: Live README Preview */}
          <section className="lg:col-span-7 space-y-6">
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-white">Live Preview</h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Ready
                </span>
              </div>

              <div className="text-xs text-neutral-500 border border-dashed border-white/10 rounded-xl p-12 text-center">
                Fastfetch card preview
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
