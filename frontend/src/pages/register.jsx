import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        address,
        password,
      });

      console.log(response.data);
      navigate("/login");
    } catch (error) {
      const errors = error.response?.data?.errors;

      if (errors?.length) {
        setError(errors[0].message);
      } else {
        setError(
          error.response?.data?.message || "Registration failed"
        );
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
            Register
          </h1>

          <form onSubmit={handleSubmit} className="mt-8">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded bg-[#17171c] px-4 py-3 text-white"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-4 w-full rounded bg-[#17171c] px-4 py-3 text-white"
            />

            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-4 w-full rounded bg-[#17171c] px-4 py-3 text-white"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-4 w-full rounded bg-[#17171c] px-4 py-3 text-white"
            />

            {error && (
              <p className="mt-3 text-sm text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded bg-[#e50914] py-3 text-white"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <Link
            to="/"
            className="mt-6 block text-center text-gray-400"
          >
            Back to Landing
          </Link>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#e50914] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;


