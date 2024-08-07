import { create } from 'zustand';
import authApi from '../lib/authAxios';
import basicApi from '@/lib/basicAxios';
import Cookies from 'js-cookie';
import { User } from '@/types/UserType';

interface AuthState {
  user: User | null;
  isPending: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  checkAuth: () => Promise<void>;
  setProfile: (id: number, code: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isPending: false,

  signIn: async (email, password) => {
    set({ isPending: true });
    const response = await basicApi.post('/auth/signIn', {
      email,
      password,
    });
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
    const response = await authApi.get('/users/me');
    set({ user: response.data });
    set({ isPending: false });
  },
  setProfile: (id: number, code: string) => {
    set((state) => {
      if (state.user) {
        return {
          user: {
            ...state.user,
            profile: { ...state.user.profile, code, id },
          },
        };
      }
      return state;
    });
  },
}));

export default useAuthStore;
