import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../Services/authSevice";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError('');

    try {
      const data = await apiLogin(email, password);
      if (data.access_token) {
        login(data.access_token);
        navigate("/open-playdates");
      }
    } catch (error) {
      console.log(error);
      // setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex h-screen w-screen absolute inset-0 z-0">
      {/* Left Section - Full Height Image */}
      <div className="w-1/2 h-full">
        <img
          src="/assets/login.jpg"
          alt="SportBuddy Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 bg-gray-50">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Sign In
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Join SportBuddy for free access
          </p>

          {/* Social Login Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button className="flex items-center justify-center w-full py-2 border rounded-lg shadow-sm hover:bg-gray-100">
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
                className="mr-2"
              />
              Sign in with Google
            </button>
            <button className="flex items-center justify-center w-full py-2 border rounded-lg shadow-sm hover:bg-gray-100">
              <img
                src="https://img.icons8.com/ios-filled/16/000000/mac-os.png"
                alt="Apple"
                className="mr-2"
              />
              Sign in with Apple
            </button>
          </div>

          <div className="text-center text-gray-500 my-3">
            or sign in with email
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-transform transform hover:scale-105"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don&lsquo;t have an account?
              <a
                href="/add-user"
                className="text-blue-600 font-medium hover:underline ml-1"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
