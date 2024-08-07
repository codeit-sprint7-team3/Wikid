import CreateWiki from '@/components/mypage/CreateWiki';
import Profile from '@/components/mypage/Profile';
import UpdatePasswordForm from '@/components/mypage/UpdatePasswordForm';
import useAuthStore from '@/store/AuthStore';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const MyPage = () => {
  const { user, isPending, checkAuth } = useAuthStore();
  const router = useRouter();
  const code = user?.profile?.code;

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      if (!user) return router.replace('/login');
    };
    verifyAuth();
  }, [checkAuth]);

  return (
    <>
      {user ? (
        <div>
          <h1>계정 설정</h1>
          <UpdatePasswordForm />
          {code ? <Profile /> : <CreateWiki />}{' '}
        </div>
      ) : null}
    </>
  );
};

export default MyPage;
