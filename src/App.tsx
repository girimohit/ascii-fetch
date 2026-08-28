import { useState, useEffect } from 'react';
import Header from './components/Header';
import PhotoUploader from './components/PhotoUploader';
import FieldEditor from './components/FieldEditor';
import ReadmeCard from './components/ReadmeCard';
import { DEFAULT_ASCII } from './utils/constants';
import { generateAsciiFromImage } from './utils/asciiGenerator';
import type { ProfileField } from './types';

const INITIAL_FIELDS: ProfileField[] = [
  { id: '1', key: 'Role', value: 'Software Development Engineer' },
  { id: '2', key: 'Status', value: 'Building' },
  { id: '3', key: 'Focus', value: 'Web Apps, SaaS, Backend Systems' },
  { id: '4', key: 'Languages.Core', value: 'C++, JavaScript, TypeScript, Python' },
  { id: '5', key: 'Frameworks.Frontend', value: 'Next.js, React' },
  { id: '6', key: 'Frameworks.Backend', value: 'Django, REST APIs' },
  { id: '7', key: 'DevOps', value: 'Docker, AWS' },
  { id: '8', key: 'Architecture', value: 'Multi-tenant, APIs, Database Design' },
  { id: '9', key: 'Approach', value: 'Build fast, learn faster' },
  { id: '10', key: 'Contact', value: '', isSectionHeader: true },
  { id: '11', key: 'Email', value: 'mohitgiri1103@gmail.com' },
  { id: '12', key: 'Portfolio', value: 'mohitgiri.vercel.app' },
  { id: '13', key: 'LinkedIn', value: 'linkedin.com/in/mohitgiri' },
];

export default function App() {
  const [username, setUsername] = useState('mohitgiri');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [asciiArt, setAsciiArt] = useState<string>(DEFAULT_ASCII);
  const [asciiWidth, setAsciiWidth] = useState<number>(44);
  const [invertAscii, setInvertAscii] = useState<boolean>(false);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [fields, setFields] = useState<ProfileField[]>(INITIAL_FIELDS);

  // Trigger live ASCII generation when photo or settings change
  useEffect(() => {
    if (!photoUrl) {
      setAsciiArt(DEFAULT_ASCII);
      return;
    }

    setIsConverting(true);
    generateAsciiFromImage(photoUrl, {
      width: asciiWidth,
      inverted: invertAscii,
      contrast: 1.15,
    })
      .then((art) => {
        setAsciiArt(art);
      })
      .catch((err) => {
        console.error('ASCII generation error:', err);
      })
      .finally(() => {
        setIsConverting(false);
      });
  }, [photoUrl, asciiWidth, invertAscii]);

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
                  Customize your profile details and photo
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

              {/* ASCII Art Resolution & Contrast Controls */}
              {photoUrl && (
                <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-300 font-medium">ASCII Resolution</span>
                    <span className="text-[#C660CE] font-mono text-[11px]">{asciiWidth} chars</span>
                  </div>
                  <input
                    type="range"
                    min="32"
                    max="64"
                    step="2"
                    value={asciiWidth}
                    onChange={(e) => setAsciiWidth(Number(e.target.value))}
                    className="w-full accent-[#C660CE] cursor-pointer"
                  />

                  <div className="flex items-center justify-between pt-1">
                    <label className="text-xs text-neutral-400 cursor-pointer flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={invertAscii}
                        onChange={(e) => setInvertAscii(e.target.checked)}
                        className="rounded bg-neutral-900 border-white/10 text-[#C660CE] focus:ring-0 cursor-pointer"
                      />
                      Invert light/dark ramp
                    </label>
                    {isConverting && (
                      <span className="text-[10px] text-[#38bdf8] animate-pulse font-mono">
                        processing...
                      </span>
                    )}
                  </div>
                </div>
              )}

              <hr className="border-white/10" />

              {/* Dynamic Field Editor */}
              <FieldEditor
                fields={fields}
                onChange={setFields}
              />
            </div>
          </section>

          {/* Right Column: Live README Preview */}
          <section className="lg:col-span-7 space-y-6">
            <div className="glass-panel rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-white mb-0.5">Live Preview</h2>
                  <p className="text-xs text-neutral-400">
                    Real-time generated GitHub README card
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  ● Live
                </span>
              </div>

              {/* Readme Card Component */}
              <div className="overflow-x-auto pb-2">
                <ReadmeCard
                  username={username}
                  asciiArt={asciiArt}
                  fields={fields}
                />
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
