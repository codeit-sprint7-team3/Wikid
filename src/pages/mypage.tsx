import CreateWiki from '@/components/mypage/CreateWiki';
import Profile from '@/components/mypage/Profile';
import UpdatePasswordForm from '@/components/mypage/UpdatePasswordForm';
import useAuthStore from '@/store/AuthStore';

const MyPage = () => {
  const { user } = useAuthStore();
  const code = user?.profile?.code;

  return (
    <>
      <h1>계정 설정</h1>
      <UpdatePasswordForm />
      {code ? <Profile /> : <CreateWiki />}
    </>
  );
};

export default MyPage;
