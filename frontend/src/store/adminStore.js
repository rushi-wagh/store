import { create } from "zustand";
import api from "../utils/api";

const useAdminStore = create((set) => ({
  users: [],
  stores: [],
  isLoading: false,

  getUsers: async (sortBy = "name", order = "asc", search = "", role = "") => {
    try {
      const response = await api.get("/admin/users", {
        params: {
          sortBy,
          order,
          search,
          role,
        },
        withCredentials: true,
      });

      set({
        users: response.data.users,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getStores: async (sortBy = "name", order = "asc", search = "") => {
    try {
      const response = await api.get("/admin/stores", {
        params: {
          sortBy,
          order,
          search,
        },
        withCredentials: true,
      });

      set({
        stores: response.data.stores,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  addUser: async (data) => {
    try {
      const response = await api.post("/admin/users", data, {
        withCredentials: true,
      });

      set((state) => ({
        users: [...state.users, response.data.user],
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  addStore: async (data) => {
    try {
      const response = await api.post("/admin/stores", data, {
        withCredentials: true,
      });

      set((state) => ({
        stores: [...state.stores, response.data.store],
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getUser: async (id) => {
    try {
      const response = await api.get(`/admin/user/${id}`, {
        withCredentials: true,
      });

      return response.data.user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getStoreOwners: async () => {
    try {
      const response = await api.get("/admin/users", {
        params: {
          role: "STORE_OWNER",
          sortBy: "name",
          order: "asc",
        },
        withCredentials: true,
      });

      return response.data.users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));

export default useAdminStore;
