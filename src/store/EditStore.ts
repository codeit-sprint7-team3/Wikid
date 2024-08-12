import authApi from '@/lib/authAxios';
import basicApi from '@/lib/basicAxios';
import { Profile } from '@/types/UserType';
import { AxiosError } from 'axios';
import { create } from 'zustand';

const DEADLINE_MINUTES = 5; // 5분

export const defaultProfile: Profile = {
  updatedAt: '',
  securityQuestion: '',
  securityAnswer: '',
  teamId: '',
  content: '',
  nationality: '',
  family: '',
  bloodType: '',
  nickname: '',
  birthday: '',
  sns: '',
  job: '',
  mbti: '',
  city: '',
  image: '',
  code: '',
  name: '',
  id: 0,
};

interface EditMode {
  isEditable: boolean;
  registeredAt: string | null;
  userId: number | null;
  timer: NodeJS.Timeout | null;
  isOverTime: boolean;
  code: string | null;
  loggedInUserId: number | null;
  profile: Profile;
  init: (code: string, loggedInUserId: number) => void;
  fetchPing: () => Promise<boolean>;
  updatePing: (
    answer: string
  ) => Promise<{ success: boolean; code: number | null }>;
  setProfile: (profile: Profile) => void;
  resetStore: () => void;
}

const useEditmodeStore = create<EditMode>((set, get) => ({
  isEditable: true,
  registeredAt: null,
  userId: null,
  timer: null,
  isOverTime: false,
  code: null,
  loggedInUserId: null,
  profile: defaultProfile,

  init: (code: string, loggedInUserId: number) => {
    set({ code, loggedInUserId });
    get().fetchPing();
  },

  setProfile: (profile: Profile) => {
    set({ profile });
  },

  fetchPing: async () => {
    const { code } = get();
    if (!code) {
      console.warn('Code is not set.');
      return false;
    }

    try {
      const res = await basicApi.get(`profiles/${code}/ping`);
      const { registeredAt, userId } = res.data;

      if (registeredAt && userId) {
        set({ isEditable: false, registeredAt, userId });
        return false;
      } else {
        set({ isEditable: true, registeredAt: null, userId: null });
        return true;
      }
    } catch (error) {
      console.error('Error fetching ping:', error);
      return false;
    }
  },

  updatePing: async (answer: string) => {
    const { isEditable, code, loggedInUserId } = get();

    if (!isEditable || !code || loggedInUserId === null) {
      return { success: false, code: null };
    }

    try {
      const res = await authApi.post(`profiles/${code}/ping`, {
        securityAnswer: answer,
      });
      const { registeredAt, userId } = res.data;

      const timer = setTimeout(() => {
        set({ isOverTime: true });
      }, DEADLINE_MINUTES * 60 * 1000);

      set({ isEditable: false, registeredAt, userId, timer });
      return { success: true, code: res.status };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 400) {
        return { success: false, code: 400 };
      } else {
        return { success: false, code: null };
      }
    }
  },

  resetStore: () => {
    set({
      isEditable: true,
      registeredAt: null,
      userId: null,
      timer: null,
      isOverTime: false,
      code: null,
      loggedInUserId: null,
      profile: defaultProfile,
    });
  },
}));

export default useEditmodeStore;