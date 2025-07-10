'use client';

import { uploadMedia } from '@/services/media.service';
import { Editor } from '@tinymce/tinymce-react';

type Props = {
  value?: string;
  onChange?: (content: string) => void;
};

export default function TinyMceEditor({ value, onChange }: Props) {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      value={value} // controlled by props
      onEditorChange={(newContent) => {
        onChange?.(newContent);
      }}
      init={{
        height: 500,
        menubar: false,
        plugins:
          'emoticons image media link codesample table visualblocks wordcount lists',
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        file_picker_callback: async (callback: any, _value: any, meta: any) => {
          if (meta.filetype === 'image') {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';

            input.onchange = async () => {
              const file = input.files?.[0];
              if (!file) return;

              try {
                const media = await uploadMedia(file);
                callback(media.url, { title: file.name });
              } catch (err) {
                console.error('❌ Upload error:', err);
                alert('Lỗi khi upload ảnh');
              }
            };

            input.click();
          }
        },
        images_reuse_filename: true,
      }}
    />
  );
}
