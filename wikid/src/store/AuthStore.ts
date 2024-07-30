import create from 'zustand';
import api from '../lib/axios';
import Cookies from 'js-cookie';

interface User {
  id: number;
  name: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  profile: null | string;
  email: string | null;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isPending: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  checkAuth: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

const UseAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isPending: false,

  signIn: async (email, password) => {
    set({ isPending: true });
    try {
      const response = await api.post('/auth/signIn', { email, password });
      const { user, accessToken, refreshToken } = response.data;
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);
      set({ user, accessToken, refreshToken, isPending: false });
      return true;
    } catch (error) {
      console.error(error);
      set({ isPending: false });
      return false;
    }
  },

  signOut: () => {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });
    set({ user: null, accessToken: null, refreshToken: null });
  },

  checkAuth: async () => {
    set({ isPending: true });
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    if (!accessToken || !refreshToken) {
      set({ user: null, accessToken: null, refreshToken: null });
      return;
    }
    try {
      const response = await api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({
        user: response.data,
        accessToken,
        refreshToken,
        isPending: false,
      });
    } catch (error) {
      if ((error as any).response?.data?.message === 'jwt expired') {
        await get().refreshAccessToken();
      } else {
        console.error(error);
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isPending: false,
        });
      }
    }
  },

  refreshAccessToken: async () => {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
      set({ user: null, accessToken: null, refreshToken: null });
      return;
    }
    try {
      const response = await api.post('/auth/refresh', { refreshToken });
      const { accessToken } = response.data;
      Cookies.set('accessToken', accessToken);
      set({ accessToken });
    } catch (error) {
      console.error(error);
      set({ user: null, accessToken: null, refreshToken: null });
    }
  },
}));

export default UseAuthStore;