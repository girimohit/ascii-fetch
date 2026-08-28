import React, { useRef, useState } from 'react';

interface PhotoUploaderProps {
  photoUrl: string | null;
  onPhotoChange: (url: string | null) => void;
}

export default function PhotoUploader({ photoUrl, onPhotoChange }: PhotoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      onPhotoChange(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-neutral-300">Profile Photo</label>
        {photoUrl && (
          <button
            type="button"
            onClick={() => {
              onPhotoChange(null);
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
            className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {photoUrl ? (
        <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-black/40 p-2 flex items-center gap-4">
          <img
            src={photoUrl}
            alt="Profile preview"
            className="w-16 h-16 object-cover rounded-lg border border-white/10"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">Image loaded</p>
            <p className="text-[11px] text-neutral-400">Ready for ASCII conversion</p>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="glass-btn px-3 py-1.5 rounded-lg text-xs font-medium mr-1"
          >
            Replace
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-[#C660CE] bg-[#C660CE]/10'
              : 'border-white/10 hover:border-white/20 bg-black/20 hover:bg-black/30'
          }`}
        >
          <div className="flex flex-col items-center gap-1.5">
            <svg
              className="w-6 h-6 text-neutral-400 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xs text-neutral-200">
              <span className="text-[#C660CE] font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-[10px] text-neutral-500 font-mono">PNG, JPG, WEBP up to 5MB</p>
          </div>
        </div>
      )}
    </div>
  );
}
