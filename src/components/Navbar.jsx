import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext); 
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // State to show logout confirmation
  const [logoutMessage, setLogoutMessage] = useState(""); // State to show logout message

  const handleLogout = () => {
    setShowLogoutConfirm(true); 
  };

  const confirmLogout = () => {
    logout();
    setLogoutMessage("You are now logged out.");
    setShowLogoutConfirm(false);

    setTimeout(() => {
      setLogoutMessage("");
    }, 3000);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false); 
  };

  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-around space-x-4">
        <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
        <li><Link to="/sports" className="text-white hover:text-gray-300">Sports</Link></li>
        
        {user ? (
          <>
            <li><Link to="/open-playdates" className="text-white hover:text-gray-300">Open Playdates</Link></li>
            <li><Link to="/playdates" className="text-white hover:text-gray-300">Create Playdate</Link></li>
            <li>
              <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="text-white hover:text-gray-300">Login</Link></li>
            <li><Link to="/add-user" className="text-white hover:text-gray-300">Sign-Up</Link></li>
          </>
        )}
      </ul>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-around space-x-4">
              <button onClick={confirmLogout} className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600">Yes</button>
              <button onClick={cancelLogout} className="bg-gray-500 text-white px-8 py-2 rounded-md hover:bg-gray-600">No</button>
            </div>
          </div>
        </div>
      )}

      {logoutMessage && (
        <div className="mt-4 text-center text-white">
          <p>{logoutMessage}</p>
        </div>
      )}
    </nav>
  );
}

export default Navbar;