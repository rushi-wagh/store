import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import useStoreStore from "../store/storeStore";
import useRatingStore from "../store/ratingStore";
import useAuthStore from "../store/authStore";
import api from "../utils/api";

const Dashboard = () => {
  const stores = useStoreStore((state) => state.stores);
  const searchStores = useStoreStore((state) => state.searchStores);

  const ratings = useRatingStore((state) => state.ratings);
  const getRatings = useRatingStore((state) => state.getRatings);
  const addRating = useRatingStore((state) => state.addRating);
  const user = useAuthStore((state) => state.authUser);

  const [search, setSearch] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    searchStores("");
  }, [searchStores]);

  useEffect(() => {
    if (selectedStore) {
      getRatings(selectedStore.id);
    }
  }, [selectedStore, getRatings]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    searchStores(value);
  };

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length
      : 0;

  const userRating = ratings.find((item) => item.userId === user?.id);

  const handleRating = async (e) => {
    e.preventDefault();

    try {
      if (userRating) {
        await api.put(`/rating/${userRating.id}`, {
          storeId: selectedStore.id,
          rating: Number(rating),
          comment,
        });
      } else {
        await addRating({
          storeId: selectedStore.id,
          rating: Number(rating),
          comment,
        });
      }

      await getRatings(selectedStore.id);
      await searchStores(search);

      setRating(5);
      setComment("");
      setShowRating(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f16] text-white">
      <NavBar />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 gap-5 min-h-[calc(100vh-120px)]">
          <div className="border border-[#202b3a] rounded-xl bg-[#0e141d] p-6">
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search by name or address"
                value={search}
                onChange={handleSearch}
                className="w-full bg-[#151d29] border border-[#304057] rounded-lg py-4 px-4 text-lg outline-none focus:border-blue-500"
              />
            </div>

            <h1 className="text-3xl font-bold">View and Rate Stores</h1>

            <p className="text-gray-400 text-lg mt-2 mb-8">
              Find stores near you and share your experience.
            </p>

            <div className="space-y-3">
              {stores.map((store) => {
                const storeRating = store.rating || 0;

                return (
                  <button
                    key={store.id}
                    onClick={() => setSelectedStore(store)}
                    className={`w-full text-left border rounded-xl p-5 flex items-center justify-between transition ${
                      selectedStore?.id === store.id
                        ? "border-blue-500 bg-[#18263b]"
                        : "border-[#202b3a] bg-[#111923] hover:border-[#40516a]"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-xl bg-[#163b2c]" />

                      <div>
                        <h2 className="text-xl font-semibold">{store.name}</h2>

                        <p className="text-gray-400 mt-2">{store.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xl">
                          <span className="text-yellow-400">
                            {"★".repeat(Math.round(storeRating))}
                          </span>

                          <span className="text-gray-600">
                            {"★".repeat(5 - Math.round(storeRating))}
                          </span>
                        </div>

                        <p className="text-lg">
                          {Number(storeRating).toFixed(1)}{" "}
                          <span className="text-gray-500 text-sm">
                            ({store.ratingCount || 0})
                          </span>
                        </p>
                      </div>

                      <span className="text-3xl text-gray-400">›</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedStore ? (
            <div className="border border-[#202b3a] rounded-xl bg-[#0e141d] p-8">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-xl bg-[#163b2c]" />

                <div>
                  <h2 className="text-3xl font-bold">{selectedStore.name}</h2>

                  <p className="text-gray-400 text-lg mt-3">
                    {selectedStore.address}
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-5 text-lg">
                <p className="text-gray-300">{selectedStore.email}</p>

                <p className="text-gray-300">{selectedStore.address}</p>
              </div>

              <div className="border-b border-[#263242] my-7" />

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl text-yellow-400">★</span>

                    <span className="text-3xl font-bold">
                      {Number(averageRating).toFixed(1)}
                    </span>

                    <span className="text-gray-400">/ 5</span>
                  </div>

                  <p className="text-gray-400 mt-1">
                    ({ratings.length} ratings)
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (userRating) {
                      setRating(userRating.rating);
                      setComment(userRating.comment || "");
                    } else {
                      setRating(5);
                      setComment("");
                    }

                    setShowRating(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-lg font-medium"
                >
                  {userRating ? "Modify Rating" : "Rate this Store"}
                </button>
              </div>

              <div className="border-b border-[#263242] my-7" />

              <h2 className="text-2xl font-semibold mb-5">User Ratings</h2>

              <div className="space-y-4 max-h-[470px] overflow-y-auto pr-2">
                {ratings.length === 0 ? (
                  <p className="text-gray-400">No ratings yet.</p>
                ) : (
                  ratings.map((item) => (
                    <div
                      key={item.id}
                      className="border border-[#202b3a] bg-[#111923] rounded-xl p-5"
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-[#334155] flex items-center justify-center text-lg">
                            {item.user?.name?.charAt(0)}
                          </div>

                          <div>
                            <p className="font-medium text-lg">
                              {item.user?.name}
                            </p>

                            <div className="text-yellow-400">
                              {"★".repeat(item.rating)}

                              <span className="text-gray-600">
                                {"★".repeat(5 - item.rating)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {item.comment && (
                        <p className="text-gray-400 mt-4 ml-16">
                          {item.comment}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="border border-[#202b3a] rounded-xl bg-[#0e141d] flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-semibold">Select a store</h2>

                <p className="text-gray-400 mt-2">
                  Choose a store to view its ratings
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showRating && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-[#111923] border border-[#2a3748] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Rate {selectedStore.name}</h2>

              <button
                onClick={() => setShowRating(false)}
                className="text-gray-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleRating}>
              <label className="text-gray-400">Rating</label>

              <div className="flex gap-2 text-4xl my-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => setRating(value)}
                    className={
                      value <= rating ? "text-yellow-400" : "text-gray-600"
                    }
                  >
                    ★
                  </button>
                ))}
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your experience..."
                className="w-full h-28 bg-[#0b0f16] border border-[#2a3748] rounded-lg p-4 outline-none resize-none"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg mt-4"
              >
                Submit Rating
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
