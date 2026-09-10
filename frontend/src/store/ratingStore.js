import { create } from "zustand";
import api from "../utils/api";

const useRatingStore = create((set) => ({
  ratings: [],
  isLoading: false,

  getRatings: async (storeId) => {
    set({ isLoading: true });

    try {
      const response = await api.get(`/rating/${storeId}`, {
        withCredentials: true,
      });

      set({ ratings: response.data.ratings });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  addRating: async (data) => {
    try {
      const response = await api.post("/rating/", data, {
        withCredentials: true,
      });

      set((state) => ({
        ratings: [...state.ratings, response.data.rating],
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateRating: async (ratingId, data) => {
    try {
      const response = await api.put(`/rating/${ratingId}`, data, {
        withCredentials: true,
      });

      set((state) => ({
        ratings: state.ratings.map((rating) =>
          rating.id === ratingId ? response.data.rating : rating
        ),
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));

export default useRatingStore;