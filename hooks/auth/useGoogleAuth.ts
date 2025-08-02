import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AppDispatch } from '@/store';
import { login as loginAction } from '@/store/slices/authSlice';
import { GoogleAuthService } from '@/services/auth.service';

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      const { accessToken, user } = await GoogleAuthService.initiateGoogleAuth();
      
      // Transform user data to match the expected format
      const resolvedUser = {
        id: user._id,
        fullName: user.fullName,
        role: user.role,
        email: user.email,
        avatar: user.avatar,
      };

      // Dispatch login action to update Redux store
      dispatch(
        loginAction({
          user: resolvedUser,
          accessToken,
        })
      );

      toast.success('Google login successful!');
      router.push('/');
    } catch (error) {
      console.error('Google login error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Popup blocked')) {
          toast.error('Please allow popups for this site to use Google login');
        } else if (error.message.includes('cancelled')) {
          toast.error('Google login was cancelled');
        } else {
          toast.error('Google login failed. Please try again.');
        }
      } else {
        toast.error('An unexpected error occurred during Google login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleGoogleLogin,
    isLoading,
  };
};
