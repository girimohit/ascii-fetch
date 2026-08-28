import { useState, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import Header from './components/Header';
import Footer from './components/Footer';
import PhotoUploader from './components/PhotoUploader';
import FieldEditor from './components/FieldEditor';
import ReadmeCard from './components/ReadmeCard';
import { DEFAULT_ASCII } from './utils/constants';
import { generateAsciiFromImage } from './utils/asciiGenerator';
import type { ProfileField } from './types';

const INITIAL_FIELDS: ProfileField[] = [
  { id: '1', key: 'Role', value: 'Software Development Engineer' },
  { id: '2', key: 'Languages', value: 'C++, JavaScript, TypeScript, Python' },
  { id: '3', key: 'Architecture', value: 'APIs, Database Design' },
  { id: '4', key: 'Tools', value: 'Docker, AWS' },
  { id: '5', key: 'Projects', value: 'proj1, proj2, ..' },
  { id: '6', key: 'Contact', value: '', isSectionHeader: true },
  { id: '7', key: 'Email', value: 'user@gmail.com' },
  { id: '8', key: 'LinkedIn', value: 'linkedin.com/in/username' },
  { id: '9', key: 'Phone', value: '1234567890' },
];

const CARD_BG_PRESETS = [
  { name: 'GitHub Dark', hex: '#0d1117' },
  { name: 'Pitch Black', hex: '#05070a' },
  { name: 'Charcoal', hex: '#161b22' },
];

export default function App() {
  const [username, setUsername] = useState('mohitgiri');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [asciiArt, setAsciiArt] = useState<string>(DEFAULT_ASCII);
  const [asciiWidth, setAsciiWidth] = useState<number>(75);
  const [asciiFontSize, setAsciiFontSize] = useState<number>(6.5);
  const [invertAscii, setInvertAscii] = useState<boolean>(false);
  const [cardBgColor, setCardBgColor] = useState<string>('#0d1117');
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [fields, setFields] = useState<ProfileField[]>(INITIAL_FIELDS);

  const cardRef = useRef<HTMLDivElement>(null);

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
      .then((art) => setAsciiArt(art))
      .catch((err) => console.error(err))
      .finally(() => setIsConverting(false));
  }, [photoUrl, asciiWidth, invertAscii]);

  const handleDownloadPng = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `${username || 'readme'}-card.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export PNG', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-[15px]">
      <Header />

      <main className="flex-1 max-w-8xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Editor */}
          <section className="lg:col-span-4 space-y-6">
            <div className="glass-panel rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-xl font-medium text-white mb-1">Configuration</h2>
                <p className="text-sm text-neutral-400">
                  Customize your profile details and photo
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">GitHub Username</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm text-neutral-500 font-mono">@</span>
                  <input
                    type="text"
                    maxLength={24}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="yourname"
                    className="glass-input w-full pl-8 pr-3.5 py-2.5 rounded-xl text-sm font-mono"
                  />
                </div>
              </div>

              <PhotoUploader
                photoUrl={photoUrl}
                onPhotoChange={setPhotoUrl}
              />

              {photoUrl && (
                <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-4">
                  {/* Slider 1: Density / Resolution */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-300 font-medium">Density (Columns)</span>
                      <span className="text-[#C660CE] font-mono text-xs font-semibold">{asciiWidth} chars</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="180"
                      step="2"
                      value={asciiWidth}
                      onChange={(e) => setAsciiWidth(Number(e.target.value))}
                      className="w-full accent-[#C660CE] cursor-pointer"
                    />
                  </div>

                  {/* Slider 2: Size / Scale */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-300 font-medium">Art Scale (Font Size)</span>
                      <span className="text-[#38bdf8] font-mono text-xs font-semibold">{asciiFontSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="3.5"
                      max="12"
                      step="0.5"
                      value={asciiFontSize}
                      onChange={(e) => setAsciiFontSize(Number(e.target.value))}
                      className="w-full accent-[#38bdf8] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="text-sm text-neutral-400 cursor-pointer flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={invertAscii}
                        onChange={(e) => setInvertAscii(e.target.checked)}
                        className="rounded bg-neutral-900 border-white/10 text-[#C660CE] focus:ring-0 cursor-pointer"
                      />
                      Invert light/dark ramp
                    </label>
                    {isConverting && (
                      <span className="text-xs text-[#38bdf8] font-mono">
                        processing...
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-2.5">
                <label className="text-sm font-medium text-neutral-300">Card Background</label>
                <div className="flex items-center gap-2 flex-wrap">
                  {CARD_BG_PRESETS.map((preset) => (
                    <button
                      key={preset.hex}
                      type="button"
                      onClick={() => setCardBgColor(preset.hex)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
                        cardBgColor === preset.hex
                          ? 'bg-[#C660CE]/20 text-white border border-[#C660CE]'
                          : 'bg-black/30 text-neutral-400 border border-white/5 hover:border-white/15'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: preset.hex }}
                      />
                      {preset.name}
                    </button>
                  ))}
                  <input
                    type="color"
                    value={cardBgColor}
                    onChange={(e) => setCardBgColor(e.target.value)}
                    title="Custom color"
                    className="w-8 h-8 rounded-lg bg-transparent border border-white/10 cursor-pointer p-0.5"
                  />
                </div>
              </div>

              <hr className="border-white/10" />

              <FieldEditor
                fields={fields}
                onChange={setFields}
              />
            </div>
          </section>

          {/* Preview */}
          <section className="lg:col-span-8 space-y-6">
            <div className="glass-panel rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-xl font-medium text-white mb-1">Live Preview</h2>
                  <p className="text-sm text-neutral-400">
                    Real-time generated GitHub README card
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadPng}
                  disabled={isExporting}
                  className="glass-btn-primary px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  {isExporting ? 'Exporting...' : 'Download as PNG'}
                </button>
              </div>

              <div className="overflow-x-auto pb-2">
                <ReadmeCard
                  cardRef={cardRef}
                  username={username}
                  asciiArt={asciiArt}
                  fields={fields}
                  cardBgColor={cardBgColor}
                  asciiFontSize={asciiFontSize}
                />
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
