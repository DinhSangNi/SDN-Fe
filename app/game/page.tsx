// PoemGeneratorPage.tsx
// A Next.js client component that lets users upload an image
// and select a poetic form to generate a poem from the backend.

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UploadCloud, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGeneratePoemFromImage } from '@/hooks/game/useCreatePoemFromImage';
import toast from 'react-hot-toast';

const POETIC_FORMS = [
  { value: 'luc-bat', label: 'Lục bát' },
  { value: 'song-that-luc-bat', label: 'Song thất lục bát' },
  { value: 'that-ngon-tu-tuyet', label: 'Thất ngôn tứ tuyệt' },
  { value: 'tu-do', label: 'Tự do' },
] as const;

type PoeticForm = (typeof POETIC_FORMS)[number]['value'];

export default function PoemGeneratorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [poeticForm, setPoeticForm] = useState<PoeticForm>('luc-bat');
  const [poem, setPoem] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
    setPoem(null);
  };

  const chooseFile = () => inputRef.current?.click();

  const generateMutation = useGeneratePoemFromImage();

  const generatePoem = async () => {
    if (!file) return;
    if (file.size > 7 * 1024 * 1024) {
      toast.error('File size does not exceed 7MB');
      return;
    }
    if (!file.type.includes('image/')) {
      toast.error('File must be an image');
      return;
    }
    try {
      const rs = await generateMutation.mutateAsync({
        file: file,
        poeticForm: poeticForm,
      });

      setPoem(rs.data.text);
    } catch (error) {
      toast.error('Generate poem failed');
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, []);

  return (
    <div className="w-[80%] mx-auto p-4 space-y-6 min-h-screen pt-10">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <UploadCloud className="w-6 h-6" /> AI Poem Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            onClick={chooseFile}
            className="border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer flex items-center hover:bg-gray-50 transition h-[300px]"
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="mx-auto max-h-64 rounded-xl object-contain"
              />
            ) : (
              <p className="text-gray-500 w-full text-center flex flex-col items-center gap-2">
                <UploadCloud className="w-8 h-8" />
                <span>
                  Drop your image here or click to browse (PNG, JPG, GIF up to
                  10MB)
                </span>
              </p>
            )}
            <input
              type="file"
              accept="image/*"
              hidden
              ref={inputRef}
              onChange={handleFileSelect}
            />
          </div>

          {/* Poetic form selector */}
          <div>
            <p className="font-medium mb-2">Select poetric form:</p>
            <Select
              value={poeticForm}
              onValueChange={(value: PoeticForm) => setPoeticForm(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select poetry" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {POETIC_FORMS.map(({ label, value }) => {
                    return (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button
            disabled={!file || generateMutation.isPending}
            className="w-full"
            onClick={generatePoem}
          >
            {generateMutation.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Generating...
              </span>
            ) : (
              'Tạo Bài Thơ'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Poem display */}
      {poem && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-amber-50 shadow-inner">
            <CardHeader>
              <CardTitle className="text-lg">Your poem</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap leading-relaxed">{poem}</pre>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" onClick={() => setPoem(null)}>
                  Regenerate
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(poem)}
                >
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
