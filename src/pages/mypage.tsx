import CreateWiki from '@/components/mypage/CreateWiki';
import Profile from '@/components/mypage/Profile';
import UpdatePasswordForm from '@/components/mypage/UpdatePasswordForm';
import useAuthStore from '@/store/AuthStore';
import useNeadLogin from '@/hooks/useNeedLogin';
import style from '@/styles/mypage.module.css';

const MyPage = () => {
  const { user } = useAuthStore();
  useNeadLogin();
  const code = user?.profile?.code;
  if (!user) return null;
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
