import { create } from 'zustand';
import api from '../lib/axios';
import Cookies from 'js-cookie';
import { User } from '@/types/UserType';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isPending: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  checkAuth: () => Promise<void>;
}

const UseAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      isPending: false,

      signIn: async (email, password) => {
        set({ isPending: true });
        const response = await api.post('/auth/signIn', { email, password });
        const { user, accessToken, refreshToken } = response.data;
        Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken);
        set({ user });
        set({ isPending: false });
        return true;
      },

      signOut: () => {
        Cookies.remove('accessToken', { path: '/' });
        Cookies.remove('refreshToken', { path: '/' });
        set({ user: null });
      },

      checkAuth: async () => {
        set({ isPending: true });
        const response = await api.get('/users/me');
        set({ user: response.data });
        set({ isPending: false });
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);

export default UseAuthStore;
