import { useState } from 'react';
import Header from './components/Header';
import PhotoUploader from './components/PhotoUploader';
import FieldEditor from './components/FieldEditor';
import ReadmeCard from './components/ReadmeCard';
import { DEFAULT_ASCII } from './utils/constants';
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
  const [fields, setFields] = useState<ProfileField[]>(INITIAL_FIELDS);

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
