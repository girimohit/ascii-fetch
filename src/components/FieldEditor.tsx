import type { ProfileField } from '../types';

interface FieldEditorProps {
  fields: ProfileField[];
  onChange: (fields: ProfileField[]) => void;
}

export default function FieldEditor({ fields, onChange }: FieldEditorProps) {
  const handleFieldChange = (id: string, keyOrVal: 'key' | 'value', text: string) => {
    const updated = fields.map((f) => (f.id === id ? { ...f, [keyOrVal]: text } : f));
    onChange(updated);
  };

  const handleAddField = () => {
    const newField: ProfileField = {
      id: Date.now().toString(),
      key: 'New.Key',
      value: 'Value',
      isSectionHeader: false,
    };
    onChange([...fields, newField]);
  };

  const handleAddSection = () => {
    const newSection: ProfileField = {
      id: Date.now().toString(),
      key: 'Section Header',
      value: '',
      isSectionHeader: true,
    };
    onChange([...fields, newSection]);
  };

  const handleRemoveField = (id: string) => {
    onChange(fields.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-neutral-300">Profile Fields</label>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleAddSection}
            className="text-xs text-[#C660CE] hover:text-[#d373db] font-medium transition-colors cursor-pointer"
          >
            + Section
          </button>
          <span className="text-neutral-600 text-sm">|</span>
          <button
            type="button"
            onClick={handleAddField}
            className="text-xs text-[#38bdf8] hover:text-sky-300 font-medium transition-colors cursor-pointer"
          >
            + Field
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {fields.map((field) => (
          <div
            key={field.id}
            className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
              field.isSectionHeader
                ? 'bg-[#3fb950]/5 border-[#3fb950]/20'
                : 'bg-black/30 border-white/5 hover:border-white/10'
            }`}
          >
            {field.isSectionHeader ? (
              <>
                <span className="text-sm font-mono text-[#3fb950] font-bold pl-1">-</span>
                <input
                  type="text"
                  maxLength={30}
                  value={field.key}
                  onChange={(e) => handleFieldChange(field.id, 'key', e.target.value)}
                  placeholder="Section Name (e.g. Contact)"
                  className="glass-input flex-1 px-3 py-2 rounded-lg text-sm font-mono text-[#3fb950]"
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  maxLength={20}
                  value={field.key}
                  onChange={(e) => handleFieldChange(field.id, 'key', e.target.value)}
                  placeholder="Key (e.g. Role)"
                  className="glass-input w-1/3 min-w-[110px] px-3 py-2 rounded-lg text-sm font-mono text-[#f0883e]"
                />
                <span className="text-sm font-mono text-neutral-600">:</span>
                <input
                  type="text"
                  maxLength={45}
                  value={field.value}
                  onChange={(e) => handleFieldChange(field.id, 'value', e.target.value)}
                  placeholder="Value"
                  className="glass-input flex-1 px-3 py-2 rounded-lg text-sm font-mono text-[#58a6ff]"
                />
              </>
            )}

            <button
              type="button"
              onClick={() => handleRemoveField(field.id)}
              className="p-2 text-neutral-500 hover:text-rose-400 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              title="Delete field"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
