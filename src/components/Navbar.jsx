import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setLogoutMessage("You are now logged out.");
    setShowLogoutConfirm(false);

    setTimeout(() => {
      setLogoutMessage("");
    }, 800);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full transition-all duration-300 ${
          isScrolled ? "bg-blue-100 shadow-lg" : "bg-transparent"
        } bg-opacity-90 backdrop-blur-lg text-black p-4 z-50`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
          <h1 className="text-xl font-bold">SportBuddy</h1>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-200 transition-all duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/sports" className="hover:text-gray-200 transition-all duration-200">
                Sports
              </Link>
            </li>
            <li>
              <Link to="/users" className="hover:text-gray-200 transition-all duration-200">
                Users
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link to="/open-playdates" className="hover:text-gray-200 transition-all duration-200">
                    Open Playdates
                  </Link>
                </li>
                <li>
                  <Link to="/playdates" className="hover:text-gray-200 transition-all duration-200">
                    Create Playdate
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:text-gray-200 transition-all duration-200">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-gray-200 transition-all duration-200">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Prevent content overlap */}
      <div className="pt-20"></div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg mb-4 font-semibold">Are you sure you want to log out?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmLogout}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Message */}
      {logoutMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {logoutMessage}
        </div>
      )}
    </>
  );
}

export default Navbar;