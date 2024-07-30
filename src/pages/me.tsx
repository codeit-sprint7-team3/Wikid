import useCheckLogin from '@/hooks/useCheckLogin';

//test파일입니다.

const Me = () => {
  const { user } = useCheckLogin();
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
    </div>
  );
};

export default Me;