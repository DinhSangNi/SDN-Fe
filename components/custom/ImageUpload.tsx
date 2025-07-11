'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImageIcon, X } from 'lucide-react';
import { deleteMediaByUrl, uploadMedia } from '@/services/media.service';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { ButtonLoading } from './ButtonLoading';
import { optimizeCloudinaryUrl } from '@/helper';
import imageCompression from 'browser-image-compression';

type Props = {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
};

export default function ImageUpload({ value, onChange, onRemove }: Props) {
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const compressedImage = await imageCompression(file, {
        maxSizeMB: 9.8, // 🔽 Nhắm nhỏ hơn 10MB
        maxWidthOrHeight: 1920, // Resize nếu ảnh quá lớn
        useWebWorker: true, // Không block UI
      });
      const res = await uploadMedia(compressedImage);
      onChange(res.url);
    } catch (err) {
      alert('Lỗi khi upload ảnh');
      console.error(err);
    } finally {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      setLoading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!value) return;
    try {
      setLoading(true);
      const res = await deleteMediaByUrl(value);
      if (res.status === 200) {
        toast.success('Image was removed');
        onRemove?.();
      }
    } catch (error) {
      console.log('error: ', error);
      toast.error('Upload image fail');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!value) return;
    setImage(value);
  }, [value]);

  return (
    <div className="">
      {value && (
        <div className="relative w-96 h-48 border rounded overflow-hidden">
          {image && (
            <Image
              width={1000}
              height={1000}
              src={optimizeCloudinaryUrl(image)}
              alt="cover_image"
              priority
              className="object-cover w-full h-full"
            />
          )}
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-1 right-1 p-1 bg-white rounded-full shadow"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={inputRef}
      />

      <ButtonLoading
        type="button"
        loading={loading}
        onClick={() => inputRef.current?.click()}
        className="gap-2"
      >
        <ImageIcon className="w-4 h-4" />
        {value ? 'Change image' : 'Choose an image'}
      </ButtonLoading>
    </div>
  );
}
