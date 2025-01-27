import { useEffect, useState } from "react";
import { fetchUsers } from "../Services/userService";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link, Navigate } from "react-router-dom";

function UserList() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await fetchUsers();
        console.log("userData", userData);
        setUsers(userData);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch user data, please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (user) getUsers();
  }, [user]);

  return user ? (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">User List</h2>

      {loading ? (
        <div className="text-center text-gray-600 flex flex-col items-center">
          <svg className="w-10 h-10 animate-spin text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
            <path fill="currentColor" d="M4 12a8 8 0 0116 0"></path>
          </svg>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-xl font-medium text-gray-800">{user.first_name} {user.last_name}</h3>
              <p className="text-gray-600 text-sm mt-2">@{user.username}</p>
            </div>
          ))}
          <Link to="/">
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
              Go to Home
            </button>
          </Link>
        </div>
      )}
    </div>
  ) : <Navigate to="/login" />;
}

export default UserList;