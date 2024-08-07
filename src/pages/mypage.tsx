import CreateWiki from '@/components/mypage/CreateWiki';
import Profile from '@/components/mypage/Profile';
import UpdatePasswordForm from '@/components/mypage/UpdatePasswordForm';
import useAuthStore from '@/store/AuthStore';
import style from '@/styles/mypage.module.css';

const MyPage = () => {
  const { user } = useAuthStore();
  const code = user?.profile?.code;

  return (
    <>
      <div className={style.container}>
        <h1 className={style.headerTitle}>계정 설정</h1>
        <UpdatePasswordForm />
        <div className={style.line}></div>
        {code ? <Profile /> : <CreateWiki />}
      </div>
    </>
  );
};

export default MyPage;
