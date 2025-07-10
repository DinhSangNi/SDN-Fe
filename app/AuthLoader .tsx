'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@/store/slices/authSlice';

const AuthLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    if (userData && accessToken) {
      dispatch(
        login({
          user: JSON.parse(userData),
          accessToken: accessToken,
        })
      );
    }
  }, []);

  return null;
};

export default AuthLoader;
