export const ASCII_CHARS = " .:-=+*#%@";

export interface AsciiOptions {
  width?: number;
  inverted?: boolean;
  contrast?: number; // 0 to 2, default 1
}

/**
 * Converts an image URL (dataURL or web URL) to ASCII art text.
 * Faithful JavaScript port of the PIL script with 0.52 aspect ratio correction.
 */
export function generateAsciiFromImage(
  imageUrl: string,
  options: AsciiOptions = {}
): Promise<string> {
  const { width = 48, inverted = false, contrast = 1.1 } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const originalWidth = img.naturalWidth || img.width;
        const originalHeight = img.naturalHeight || img.height;
        const aspectRatio = originalHeight / originalWidth;

        // Monospace characters are approx 1.9x taller than wide (0.52 aspect ratio)
        const targetWidth = Math.max(20, Math.min(260, Math.floor(width)));
        const targetHeight = Math.max(10, Math.floor(aspectRatio * targetWidth * 0.52));

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          reject(new Error('Could not get 2D canvas context'));
          return;
        }

        // Draw and scale image
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
        const data = imageData.data;

        let asciiStr = '';
        const numChars = ASCII_CHARS.length;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          // Handle transparency
          if (a < 64) {
            asciiStr += ' ';
            continue;
          }

          // Grayscale luminance conversion (ITU-R 601-2 standard)
          let gray = 0.299 * r + 0.587 * g + 0.114 * b;

          // Apply contrast adjustment
          if (contrast !== 1) {
            gray = ((gray / 255 - 0.5) * contrast + 0.5) * 255;
            gray = Math.max(0, Math.min(255, gray));
          }

          if (inverted) {
            gray = 255 - gray;
          }

          const charIndex = Math.min(
            Math.floor((gray * numChars) / 256),
            numChars - 1
          );
          asciiStr += ASCII_CHARS[charIndex];
        }

        // Split into rows of targetWidth
        const rows: string[] = [];
        for (let i = 0; i < asciiStr.length; i += targetWidth) {
          rows.push(asciiStr.slice(i, i + targetWidth));
        }

        resolve(rows.join('\n'));
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = (err) => {
      reject(new Error('Failed to load image for ASCII conversion: ' + err));
    };

    img.src = imageUrl;
  });
}
