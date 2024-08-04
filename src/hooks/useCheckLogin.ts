import { useEffect, useState } from 'react';
import useAuthStore from '@/store/AuthStore';
import { User } from '@/types/UserType';

const useCheckLogin = () => {
  const { user } = useAuthStore();
  const [clientUser, setClientUser] = useState<User | null>();

  useEffect(() => {
    setClientUser(user);
  }, [user]);

  return clientUser;
};

export default useCheckLogin;
