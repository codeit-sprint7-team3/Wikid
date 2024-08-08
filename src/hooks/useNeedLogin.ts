import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '@/store/AuthStore';

const useNeedLogin = () => {
  const { user, checkAuth } = useAuthStore();
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setIsAuthChecked(true);
    };
    verifyAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthChecked && !user) {
      router.replace('/login');
    }
  }, [isAuthChecked, user, router]);
};

export default useNeedLogin;
