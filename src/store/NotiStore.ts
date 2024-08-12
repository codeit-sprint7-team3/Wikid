import authApi from "@/lib/authAxios";
import { Noti } from "@/types/Noti";
import { create } from "zustand";

interface NotificationStore {
  notis: Noti[];
  totalCount: number;
  page: number;
  pageSize: number;
  fetchNotifications: () => Promise<void>;
  fetchNextPage: () => Promise<void>;
  deleteNotification: (id: number) => Promise<void>;
}

const useNotificationStore = create<NotificationStore>((set, get) => ({
  notis: [],
  totalCount: 0,
  page: 1,
  pageSize: 2, // 페이지당 알림 수

  fetchNotifications: async () => {
    try {
      const { page, pageSize } = get();
      const response = await authApi.get(`/notifications?page=${page}&pageSize=${pageSize}`);
      const { list, totalCount } = response.data;
      console.log(response, list, totalCount);
      set({ notis: list, totalCount });
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  },

  fetchNextPage: async () => {
    try {
      set((state) => ({ page: state.page + 1 }));
      const { page, pageSize, notis } = get();
      const response = await authApi.get(`/notifications?page=${page}&pageSize=${pageSize}`);
      const { list } = response.data;
      set({ notis: [...notis, ...list] });
    } catch (error) {
      console.error("Failed to fetch next page notifications:", error);
    }
  },

  deleteNotification: async (id: number) => {
    try {
      await authApi.delete(`/notifications/${id}`);
      set((state) => ({
        notis: state.notis.filter((notification) => notification.id !== id),
        totalCount: state.totalCount - 1,
      }));
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  },
}));

export default useNotificationStore;
