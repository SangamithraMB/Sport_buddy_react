import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Navbar() {
  const {logout} = useAuth();
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-around space-x-4">
        <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
        <li><Link to="/login" className="text-white hover:text-gray-300">Login</Link></li>
        <li><Link to="/users" className="text-white hover:text-gray-300">Users</Link></li>
        <li><Link to="/sports" className="text-white hover:text-gray-300">Sports</Link></li>
        <li><Link to="/open-playdates" className="text-white hover:text-gray-300">Open Playdates</Link></li>
        <li><Link to="/playdates" className="text-white hover:text-gray-300">Create Playdate</Link></li>
        <li><Link to="/add-user" className="text-white hover:text-gray-300">Sign-Up</Link></li>
        <li><button onClick={() => logout()} className="text-white hover:text-gray-300">Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;