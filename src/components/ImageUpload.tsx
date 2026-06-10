import React, { useRef, useState } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import Button from './ui/Button';

export interface UploadedImage {
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
}

interface ImageUploadProps {
  value: UploadedImage | null;
  onChange: (image: UploadedImage | null) => void;
}

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Could not read image file'));
    reader.readAsDataURL(file);
  });

const getImageSize = (src: string) =>
  new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => reject(new Error('Could not load image preview'));
    image.src = src;
  });

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError('');

    if (!file.type.startsWith('image/')) {
      setStatus('error');
      setError('Please choose an image file.');
      return;
    }

    if (file.size > 6 * 1024 * 1024) {
      setStatus('error');
      setError('Please choose an image smaller than 6 MB.');
      return;
    }

    setStatus('uploading');

    try {
      const secureUrl = await fileToDataUrl(file);
      const { width, height } = await getImageSize(secureUrl);
      const format = file.type.split('/')[1] ?? 'image';

      onChange({
        publicId: file.name,
        secureUrl,
        width,
        height,
        format
      });
      setStatus('idle');
    } catch (uploadError) {
      setStatus('error');
      setError(uploadError instanceof Error ? uploadError.message : 'Image preview failed');
    } finally {
      event.target.value = '';
    }
  };

  return (
    <div>
      <label htmlFor="project-image" className="block text-sm font-medium text-gray-400 mb-2">
        Project image
      </label>
      {value ? (
        <div className="flex flex-col gap-4 rounded-lg border border-gray-800 bg-gray-900/50 p-4 sm:flex-row sm:items-center">
          <img
            src={value.secureUrl}
            alt="Uploaded project preview"
            className="h-24 w-24 rounded-md object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-gray-200">{value.publicId}</p>
            <p className="text-xs text-gray-500">
              {value.width} x {value.height} {value.format.toUpperCase()}
            </p>
          </div>
          <Button type="button" variant="secondary" className="px-4 py-2" onClick={() => onChange(null)}>
            <X size={16} />
            Remove
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-700 bg-gray-900/30 p-5 text-center">
          <input
            ref={inputRef}
            id="project-image"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            variant="secondary"
            className="px-5 py-2"
            disabled={status === 'uploading'}
            onClick={() => inputRef.current?.click()}
          >
            {status === 'uploading' ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
            {status === 'uploading' ? 'Uploading...' : 'Upload Image'}
          </Button>
          <p className="mt-3 text-sm text-gray-500">PNG, JPG, WebP, or GIF up to 6 MB. Images are saved in this browser.</p>
        </div>
      )}
      {status === 'error' && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUpload;
