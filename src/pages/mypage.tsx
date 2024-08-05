import CreateWiki from '@/components/mypage/CreateWiki';
import UpdatePasswordForm from '@/components/mypage/UpdatePasswordForm';

const MyPage = () => {
  return (
    <>
      <h1>계정 설정</h1>
      <UpdatePasswordForm />
      <CreateWiki />
    </>
  );
};

export default MyPage;
