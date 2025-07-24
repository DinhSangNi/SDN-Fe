'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateLab } from '@/hooks/lab/useCreateLab';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

export const createLabSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().optional(),
  location: z.string().optional(),
  totalSeats: z.coerce
    .number()
    .min(1, { message: 'Total seats must be at least 1' }),
  autoGenerateSeats: z.boolean().optional(),
});

export type CreateLabSchema = z.infer<typeof createLabSchema>;

export default function CreateLabPage() {
  const router = useRouter();
  const form = useForm<CreateLabSchema>({
    resolver: zodResolver(createLabSchema),
    defaultValues: {
      name: '',
      description: '',
      location: '',
      totalSeats: 0,
      autoGenerateSeats: true,
    },
  });

  const { mutate: createLab, isPending } = useCreateLab();

  const onSubmit = (values: CreateLabSchema) => {
    createLab(values, {
      onSuccess: () => {
        router.push('/admin/lab');
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Create New Lab</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lab Name</FormLabel>
                <FormControl>
                  <Input placeholder="Lab A,..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Optional" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Building 2, Room 201,..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Total Seats */}
          <FormField
            control={form.control}
            name="totalSeats"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Seats</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Auto Generate Seats */}
          <FormField
            control={form.control}
            name="autoGenerateSeats"
            render={({ field }) => (
              <FormItem className="flex items-end gap-2">
                <FormLabel>Auto-generate Seats</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Creating...' : 'Create Lab'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
