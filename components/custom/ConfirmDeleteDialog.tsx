'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useDeletePost } from '@/hooks/post/useDeletePost';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { useRef } from 'react';
import { useDeleteUser } from '@/hooks/user/useDeleteUser';

type Props = {
  type?: 'post' | 'user';
  id: string;
  children: React.ReactNode;
};

export default function ConfirmDeleteDialog({
  type = 'post',
  id,
  children,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const deleteUserMutation = useDeleteUser();
  const deletePostMutation = useDeletePost();
  const deleteMutation =
    type === 'post' ? deletePostMutation : deleteUserMutation;

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        closeRef.current?.click();
      },
      onError: () => {
        toast.error(`Delete ${type} failed`);
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this {type}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The {type} will be permanently
            deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel ref={closeRef}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
