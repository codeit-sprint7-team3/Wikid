import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '@/store/AuthStore';

const useCheckAlreadyLogin = () => {
  const { user, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      if (user) {
        router.replace('/mypage');
      }
    };
    verifyAuth();
  }, [checkAuth, user, router]);
};

export default useCheckAlreadyLogin;
