import { useEffect, useState, useContext } from "react";
import { fetchUsers } from "../Services/userService";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";
import Chat from "./Chat";

function UserList() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await fetchUsers();
        const filteredUsers = userData.filter((u) => u.id !== user.userId);
        setUsers(filteredUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load SportBuddies, please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (user) getUsers();
  }, [user]);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {selectedUser ? (
        <div>
          <button
            onClick={() => setSelectedUser(null)}
            className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 transition duration-200"
          >
            Back to SportBuddies
          </button>
          <Chat receiverId={selectedUser.id} senderId={user.userId} />
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Find Your SportBuddy
          </h2>

          {loading ? (
            <div className="text-center text-gray-600 flex flex-col items-center">
              <p className="mt-4 text-gray-600">Loading SportBuddies...</p>
            </div>
          ) : error ? (
            <p className="text-center text-red-500 font-semibold">{error}</p>
          ) : users.length === 0 ? (
            <p className="text-center text-gray-500">No SportBuddies available yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {users.map((u) => (
                <div
                  key={u.id}
                  onClick={() => setSelectedUser(u)}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <h3 className="text-xl font-medium text-gray-800">
                    {u.first_name} {u.last_name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">@{u.username}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UserList;