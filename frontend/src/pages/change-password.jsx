import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.patch(
        "/auth/update-password",
        {
          oldPassword,
          newPassword,
        },
        {
          withCredentials: true,
        },
      );

      console.log(response.data);
      navigate("/");
    } catch (error) {
      const errors = error.response?.data?.errors;
      console.log("Error changing password:", error.response?.data || error.message);

      if (errors?.length) {
        setError(errors[0].message);
      } else {
        setError(error.response?.data?.message || "Password change failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-white text-center">
            Change Password
          </h1>

          <form onSubmit={handleSubmit} className="mt-8">
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full rounded bg-[#17171c] px-4 py-3 text-white"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-4 w-full rounded bg-[#17171c] px-4 py-3 text-white"
            />

            {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded bg-[#e50914] py-3 text-white"
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
