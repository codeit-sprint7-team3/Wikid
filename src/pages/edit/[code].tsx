import Editboard from '@/components/editor/Editboard';
import useAuthStore from '@/store/AuthStore';
import useEditmodeStore from '@/store/EditStore';

const Edit = () => {
  const { profile, code } = useEditmodeStore((state) => ({
    profile: state.profile,
    code: state.code,
  }));
  const { user } = useAuthStore((state) => ({ user: state.user }));
  if (!profile.id || !code) {
    return <div>잘못된 접속</div>;
  }
  return <Editboard />;
};

export default Edit;
