import React, { useEffect } from "react";
import useAuthStore from "../store/authStore";
import useStoreStore from "../store/storeStore";
import NavBar from "../components/NavBar";

const OwnerDashboard = () => {
  const user = useAuthStore((state) => state.authUser);

  const store = useStoreStore((state) => state.store);
  const averageRating = useStoreStore((state) => state.averageRating);
  const ratings = useStoreStore((state) => state.ratings);
  const isLoading = useStoreStore((state) => state.isLoading);
  const getDashboard = useStoreStore((state) => state.getDashboard);

  useEffect(() => {
    getDashboard();
  }, [getDashboard]);

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center text-gray-400">
          Loading dashboard...
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-[#0b0b0f] px-6 py-10 text-white">
        <div className="max-w-6xl mx-auto">

          <div>
            <h1 className="text-3xl font-bold">
              Store Owner Dashboard
            </h1>

            <p className="mt-2 text-gray-400">
              Welcome, {user?.name}
            </p>
          </div>

          {store && (
            <div className="mt-8 rounded-xl border border-[#2a2a35] bg-[#151820] p-6">
              <p className="text-sm text-gray-500">Your Store</p>

              <h2 className="mt-1 text-2xl font-semibold">
                {store.name}
              </h2>

              <p className="mt-2 text-gray-400">
                {store.address}
              </p>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="rounded-xl border border-[#2a2a35] bg-[#151820] p-6">
              <p className="text-gray-400">
                Average Rating
              </p>

              <div className="mt-4 flex items-center gap-4">
                <div className="text-5xl font-bold">
                  {Number(averageRating).toFixed(1)}
                </div>

                <div>
                  <div className="text-yellow-400 text-xl">
                    {"★".repeat(Math.round(averageRating))}
                    <span className="text-gray-600">
                      {"★".repeat(5 - Math.round(averageRating))}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    out of 5
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#2a2a35] bg-[#151820] p-6">
              <p className="text-gray-400">
                Total Ratings
              </p>

              <p className="mt-4 text-5xl font-bold">
                {ratings.length}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Customer ratings received
              </p>
            </div>

          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold">
              Customer Ratings
            </h2>

            <p className="mt-2 text-gray-400">
              See what your customers think about your store.
            </p>

            {ratings.length === 0 ? (
              <div className="mt-6 rounded-xl border border-[#2a2a35] bg-[#151820] p-8 text-center">
                <p className="text-gray-400">
                  No ratings yet.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {ratings.map((rating) => (
                  <div
                    key={rating.id}
                    className="rounded-xl border border-[#2a2a35] bg-[#151820] px-6 py-5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">
                          {rating.user?.name}
                        </p>

                        <p className="mt-2 text-yellow-400">
                          {"★".repeat(rating.rating)}
                          <span className="text-gray-600">
                            {"★".repeat(5 - rating.rating)}
                          </span>
                        </p>
                      </div>

                      <span className="text-sm text-gray-400">
                        {rating.rating}/5
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default OwnerDashboard;

