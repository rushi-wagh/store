import React from "react";
import useAuthStore from "../store/authStore";
import NavBar from "../components/NavBar";

const OwnerDashboard = () => {
  const user = useAuthStore((state) => state.authUser);

  const ratings = [
    { name: "Ram", rating: 5 },
    { name: "Shyam", rating: 4 },
  ];

  return (
    <>
      <NavBar/>
    <div className="min-h-screen bg-[#0b0b0f] px-6 py-10 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Store Owner Dashboard</h1>

        <p className="mt-2 text-gray-400">Welcome, {user?.name}</p>

        <div className="mt-10 rounded-xl border border-[#2a2a35] bg-[#151820] p-8">
          <h2 className="text-2xl font-semibold">Average Rating</h2>

          <div className="mt-5 flex items-center gap-4">
            <span className="text-5xl text-yellow-400">★</span>

            <div>
              <p className="text-5xl font-bold">4.2</p>
              <p className="text-gray-400">out of 5</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Recent Ratings</h2>

          <p className="mt-2 text-gray-400">
            See what your customers are saying.
          </p>

          <div className="mt-6 rounded-xl border border-[#2a2a35] overflow-hidden">
            {ratings.map((rating, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-6 py-5 border-b border-[#2a2a35] last:border-b-0"
              >
                <div>
                  <p className="font-medium">{rating.name}</p>
                  <p className="mt-1 text-yellow-400">
                    {"★".repeat(rating.rating)}
                    <span className="text-gray-600">
                      {"★".repeat(5 - rating.rating)}
                    </span>
                  </p>
                </div>

                <p className="text-gray-400">{rating.rating}/5</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default OwnerDashboard;
