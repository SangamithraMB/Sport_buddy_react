// components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-around">
        <li><Link to="/" className="text-white">Home</Link></li>
        <li><Link to="/users" className="text-white">Users</Link></li>
        <li><Link to="/sports" className="text-white">Sports</Link></li>
        <li><Link to="/playdates" className="text-white">Playdates</Link></li>
        <li><Link to="/add-user" className="text-white">Add User</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;