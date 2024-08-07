import CreateWiki from '@/components/mypage/CreateWiki';
import Profile from '@/components/mypage/Profile';
import UpdatePasswordForm from '@/components/mypage/UpdatePasswordForm';
import useAuthStore from '@/store/AuthStore';

const MyPage = () => {
  const { user, isPending } = useAuthStore();
  const code = user?.profile?.code;

  if (isPending) return null;
  return (
    <>
      <h1>계정 설정</h1>
      <UpdatePasswordForm />
      {code ? <Profile /> : <CreateWiki />}
    </>
  );
};

export default MyPage;
