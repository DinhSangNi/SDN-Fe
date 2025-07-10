import api from '@/lib/axiosInstance';

export const generatePoemFromImageByGeminiAI = async (payload: {
  imageFile: File;
  poeticForm: string;
}) => {
  const prompt = `Hãy viết cho tôi một bài thơ theo thể thơ ${payload.poeticForm} dựa trên hình ảnh trên.`;
  const formData = new FormData();
  formData.append('file', payload.imageFile), formData.append('prompt', prompt);

  const res = await api.post(`/gemini/text-and-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
