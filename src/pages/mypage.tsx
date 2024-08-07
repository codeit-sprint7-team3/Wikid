import CreateWiki from '@/components/mypage/CreateWiki';
import Profile from '@/components/mypage/Profile';
import UpdatePasswordForm from '@/components/mypage/UpdatePasswordForm';
import useAuthStore from '@/store/AuthStore';
import useNeadLogin from '@/hooks/useNeedLogin';

const MyPage = () => {
  const { user } = useAuthStore();
  useNeadLogin();
  const code = user?.profile?.code;
  if (!user) return null;
  return (
    <>
      <div>
        <h1>계정 설정</h1>
        <UpdatePasswordForm />
        {code ? <Profile /> : <CreateWiki />}{' '}
      </div>
    </>
  );
};

export default MyPage;
