import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 w-full h-screen flex">
      {/* Left Section - Background Image */}
      <div className="w-1/2 h-full bg-cover bg-center bg-[url('/assets/land.jpg')]"></div>

      {/* Right Section - Text */}
      <div className="w-1/2 h-full flex flex-col justify-center bg-white/80 p-10">
        <h1 className="text-5xl font-bold text-gray-900 tracking-wide">
          Welcome to SportBuddy
        </h1>
        {user && (
          <h2 className="text-3xl font-bold text-gray-800 mt-4">
            Hello, {user.firstName}!
          </h2>
        )}
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300" 
        onClick={() => navigate("/playdates")}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
