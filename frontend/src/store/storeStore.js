import { create } from "zustand";
import api from "../utils/api";

const useStoreStore = create((set) => ({
  store: null,
  stores: [],
  averageRating: 0,
  ratings: [],
  isLoading: false,

  getDashboard: async (sortBy = "rating", order = "desc") => {
    set({ isLoading: true });

    try {
      const response = await api.get("/store/dashboard", {
        params: { sortBy, order },
        withCredentials: true,
      });

      set({
        store: response.data.store,
        averageRating: response.data.averageRating,
        ratings: response.data.ratings,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  searchStores: async (search) => {
    try {
      const response = await api.get("/store/search", {
        params: { search },
        withCredentials: true,
      });

      set({ stores: response.data.stores });
    } catch (error) {
      console.log(error);
    }
  },

  sortStores: async (sortBy = "name", order = "asc") => {
    try {
      const response = await api.get("/store/sort", {
        params: { sortBy, order },
        withCredentials: true,
      });

      set({ stores: response.data.stores });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useStoreStore;