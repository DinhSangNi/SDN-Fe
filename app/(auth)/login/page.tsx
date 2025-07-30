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
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { login } from '@/services/auth.service';
import { login as loginAction } from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/store';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(6, { message: 'Mật khẩu tối thiểu 8 ký tự' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const res = await login(values);
      if (res.status === 200) {
        const { user, accessToken } = res.data.data;
        const resolvedUser = {
          id: user._id,
          fullName: user.fullName,
          role: user.role,
          email: user.email,
          avatar: user.avatar,
        };
        dispatch(
          loginAction({
            user: resolvedUser,
            accessToken,
          })
        );
        toast.success('Login successfully');
        router.push('/');
      }
    } catch (error) {
      toast.error('Your credentials may not correct', {
        position: 'top-center',
      });
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth login
    toast.success('Google login will be implemented soon!');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-background">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        placeholder="******"
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

              <ButtonLoading type="submit" className="w-full rounded-full">
                Login
              </ButtonLoading>

              {/* Divider */}
              <div className="flex items-center my-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-sm text-gray-500">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Google Login Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-full flex items-center justify-center gap-2"
                onClick={handleGoogleLogin}
              >
                <FcGoogle size={20} />
                Continue with Google
              </Button>

              <div className="w-full text-center text-[0.9rem] mt-4">
                <p>
                  {`Don't have an account?`}{' '}
                  <Link href="/register" className="hover:underline">
                    Register
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
