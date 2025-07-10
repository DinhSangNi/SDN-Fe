'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

import RichTextEditor from './RichTextEditor';
import ImageUpload from './ImageUpload';
import { ButtonLoading } from './ButtonLoading';
import { useCreatePost } from '@/hooks/post/useCreatePost';
import { useEditPost } from '@/hooks/post/useEditPost';
import { useEffect } from 'react';

const postSchema = z.object({
  title: z.string().min(1, 'Vui lòng nhập tiêu đề'),
  type: z.enum(['post', 'announcement']),
  content: z.string().min(1, 'Vui lòng nhập nội dung'),
  coverImage: z.string().url('Phải là URL hợp lệ').optional(),
});

export type PostFormData = z.infer<typeof postSchema>;

type Props = {
  mode?: 'create' | 'edit';
  initialData?: PostFormData;
  postId?: string;
};

export default function PostForm({ mode, initialData, postId }: Props) {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData || {
      title: '',
      type: 'post',
      content: '',
      coverImage: '',
    },
  });

  const createPostMutation = useCreatePost();
  const editPostMutation = useEditPost(postId || '');

  const onSubmit = (data: PostFormData) => {
    if (mode === 'edit' && postId) {
      editPostMutation.mutate(data);
    } else {
      createPostMutation.mutate(data);
    }
  };

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const isPending =
    mode === 'edit' ? editPostMutation.isPending : createPostMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Tiêu đề */}
      <div>
        <Label htmlFor="title" className="font-semibold">
          Title
        </Label>
        <Input id="title" {...register('title')} placeholder="Enter title..." />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Loại bài viết */}
      <div>
        <Label htmlFor="type" className="font-semibold">
          Type
        </Label>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại nội dung" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="post">Post</SelectItem>
                <SelectItem value="announcement">Annoucement</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && (
          <p className="text-red-500 text-sm">{errors.type.message}</p>
        )}
      </div>

      {/* Ảnh đại diện */}
      <div>
        <Label className="font-semibold">Cover Image</Label>
        <Controller
          control={control}
          name="coverImage"
          render={({ field }) => (
            <ImageUpload
              value={field.value}
              onChange={field.onChange}
              onRemove={() => field.onChange('')}
            />
          )}
        />
        {errors.coverImage && (
          <p className="text-red-500 text-sm">{errors.coverImage.message}</p>
        )}
      </div>

      {/* Nội dung */}
      <div>
        <Label htmlFor="content" className="font-semibold">
          Content
        </Label>
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <RichTextEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
      </div>

      {/* Nút submit */}
      <ButtonLoading type="submit" loading={isPending}>
        {isPending
          ? mode === 'edit'
            ? 'Updating...'
            : 'Creating...'
          : mode === 'edit'
            ? 'Update'
            : 'Create'}
      </ButtonLoading>
    </form>
  );
}
