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
        <label className="text-xs font-medium text-neutral-300">Profile Fields</label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddSection}
            className="text-[11px] text-[#C660CE] hover:text-[#d373db] font-medium transition-colors"
          >
            + Section
          </button>
          <span className="text-neutral-600 text-xs">|</span>
          <button
            type="button"
            onClick={handleAddField}
            className="text-[11px] text-[#38bdf8] hover:text-sky-300 font-medium transition-colors"
          >
            + Field
          </button>
        </div>
      </div>

      <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
        {fields.map((field) => (
          <div
            key={field.id}
            className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
              field.isSectionHeader
                ? 'bg-[#3fb950]/5 border-[#3fb950]/20'
                : 'bg-black/30 border-white/5 hover:border-white/10'
            }`}
          >
            {field.isSectionHeader ? (
              <>
                <span className="text-xs font-mono text-[#3fb950] font-bold pl-1">-</span>
                <input
                  type="text"
                  value={field.key}
                  onChange={(e) => handleFieldChange(field.id, 'key', e.target.value)}
                  placeholder="Section Name (e.g. Contact)"
                  className="glass-input flex-1 px-2.5 py-1.5 rounded-lg text-xs font-mono text-[#3fb950]"
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={field.key}
                  onChange={(e) => handleFieldChange(field.id, 'key', e.target.value)}
                  placeholder="Key (e.g. Role)"
                  className="glass-input w-1/3 px-2.5 py-1.5 rounded-lg text-xs font-mono text-[#f0883e]"
                />
                <span className="text-xs font-mono text-neutral-600">:</span>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => handleFieldChange(field.id, 'value', e.target.value)}
                  placeholder="Value"
                  className="glass-input flex-1 px-2.5 py-1.5 rounded-lg text-xs font-mono text-[#58a6ff]"
                />
              </>
            )}

            <button
              type="button"
              onClick={() => handleRemoveField(field.id)}
              className="p-1.5 text-neutral-500 hover:text-rose-400 rounded-lg hover:bg-white/5 transition-colors"
              title="Delete field"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
