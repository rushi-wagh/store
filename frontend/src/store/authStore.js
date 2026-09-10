import { create } from "zustand";
import api from "../utils/api";

const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });

    try {
      const response = await api.get("/auth/", {
        withCredentials: true,
      });

      set({ authUser: response.data.user });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const response = await api.post("/auth/register", data);

      set({ authUser: response.data.user });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const response = await api.post("/auth/login", data);

      set({ authUser: response.data.returnedUser });

      
    } catch (error) {
      throw error;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await api.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      set({ authUser: null });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useAuthStore;
