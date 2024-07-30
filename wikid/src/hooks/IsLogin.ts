import { useEffect } from 'react';
import UseAuthStore from '@/store/AuthStore';

const IsLogin = () => {
  const { user, checkAuth } = UseAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
    };
    initAuth();
  }, [checkAuth]);

  return { user };
};

export default IsLogin;
