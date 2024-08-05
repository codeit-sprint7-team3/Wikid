import { useEffect, useState } from 'react';
import useAuthStore from '@/store/AuthStore';
import { User } from '@/types/UserType';

const useCheckLogin = () => {
  const { user } = useAuthStore();
  const [clientUser, setClientUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setClientUser(user);
    setIsLoading(false);
  }, [user]);

  return { clientUser, isLoading };
};

export default useCheckLogin;
