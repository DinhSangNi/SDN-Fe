import { generatePoemFromImageByGeminiAI } from '@/services/game';
import { useMutation } from '@tanstack/react-query';

interface Payload {
  file: File;
  poeticForm: string;
}

export function useGeneratePoemFromImage() {
  return useMutation({
    mutationFn: async ({ file, poeticForm }: Payload) => {
      return await generatePoemFromImageByGeminiAI({
        imageFile: file,
        poeticForm,
      });
    },
  });
}
