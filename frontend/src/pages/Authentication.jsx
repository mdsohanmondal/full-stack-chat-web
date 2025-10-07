import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Authentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [currentPage, setCurrentPage] = useState("sign-in");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const clearForm = () => {
  setPassword("");
  setUsername("");
  setEmail("");
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentPage === "sign-in") {
      setLoading(true);
      try {
        const res = await axios.post("http://localhost:4040/api/auth/login", {
          email,
          password,
        });

        const token = res?.data?.token;
        if (token) {
          localStorage.setItem("token", token);
          navigate("/");
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const res = await axios.post(
          "http://localhost:4040/api/auth/register",
          {
            email,
            password,
            username
          },
        );
        const token = res?.data?.token;
        if (token) {
          localStorage.setItem("token", token);
          navigate("/");
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const togglePageChange = () => {
    setCurrentPage((prev) => (prev === "sign-in" ? "sign-up" : "sign-in"));
    clearForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-xl rounded-2xl w-96 p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          {currentPage === "sign-up" && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Username*
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="sohan mondal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button
            disabled={loading}
            type="submit"
            className={`w-full bg-blue-500 ${
              loading && "bg-blue-300 cursor-wait"
            } text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200`}
          >
            {currentPage === "sign-in" ? "Login" : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={togglePageChange}
            className="text-blue-600 cursor-pointer hover:underline inline-block"
          >
            {currentPage === "sign-in" ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
}
