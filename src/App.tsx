import { useState } from 'react';
import Header from './components/Header';
import PhotoUploader from './components/PhotoUploader';

export default function App() {
  const [username, setUsername] = useState('mohitgiri');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <Header />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Configuration & Editor */}
          <section className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-lg font-medium text-white mb-1">Configuration</h2>
                <p className="text-xs text-neutral-400">
                  Customize your profile and photo
                </p>
              </div>

              {/* Username Input */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-300">GitHub Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-neutral-500 font-mono">@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="yourname"
                    className="glass-input w-full pl-7 pr-3 py-2 rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              {/* Photo Uploader */}
              <PhotoUploader
                photoUrl={photoUrl}
                onPhotoChange={setPhotoUrl}
              />
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
