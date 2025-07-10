'use client';

import dynamic from 'next/dynamic';

const TinyMceEditor = dynamic(() => import('./TinyMceEditor'), {
  ssr: false,
  loading: () => <p>Text editor is loading...</p>,
});

type Props = {
  value?: string;
  onChange?: (content: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  return <TinyMceEditor value={value} onChange={onChange} />;
}
