'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ButtonLoading } from '@/components/custom/ButtonLoading';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { register } from '@/services/auth.service';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { login } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  fullName: z.string().min(1, {
    message: 'Please fill in your full name',
  }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Pssword must be at least 8 characters' }),
});

type RegisterFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const res = await register(values);
      if (res.status === 201) {
        const { user, accessToken } = res.data.data;
        const resolvedUser = {
          id: user._id,
          fullName: user.fullName,
          role: user.role,
          email: user.email,
          avatar: user.avatar,
        };
        dispatch(
          login({
            user: resolvedUser,
            accessToken,
          })
        );
        toast.success('Register successfully');
        router.push('/');
      }
    } catch (error) {
      console.log('error: ', error);
      toast.error('Email already existed', {
        position: 'top-center',
      });
    }
    console.log('Đăng ký với:', values);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-background">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fullname</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Nguyễn Văn A"
                        className="rounded-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@gmail.com"
                        className="rounded-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        className="rounded-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-between">
                <div className="flex gap-2 items-center ">
                  <Checkbox id="remember_me" />
                  <Label htmlFor="remember_me" className="text-[0.9rem]">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/auth/forgot-password"
                  className="text-[0.9rem] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <ButtonLoading
                type="submit"
                className="w-full rounded-full py-4 font-bold"
              >
                Sign up
              </ButtonLoading>

              <div className="w-full text-center text-[0.9rem] mt-4">
                <p>
                  Already have an account?{' '}
                  <Link href="/login" className="hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
