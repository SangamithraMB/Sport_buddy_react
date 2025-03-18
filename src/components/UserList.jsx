import { useEffect, useState, useContext } from "react";
import { fetchUsers } from "../Services/userService";
import { AuthContext } from "./AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
// import Chat from "./Chat";

function UserList() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

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

  const handleUserSelect = (selectedUser) => {
    navigate(`/chat/${selectedUser.id}/${user.userId}`);
  };

  return (
    <div className="h-screen w-screen absolute inset-0 z-0  flex flex-col items-center justify-center bg-[url('/assets/user.jpg')] bg-cover bg-center">
  {/* Overlay for better readability */}
  <div className="absolute inset-0 bg-white/60"></div>

  <div className="relative z-10 p-8 w-full max-w-6xl text-center">
    {selectedUser ? (
      <div>
        <button
          onClick={() => setSelectedUser(null)}
          className="mb-4 px-4 py-2 bg-gray-500 text-black rounded-md hover:bg-gray-700 transition duration-200"
        >
          Back to SportBuddies
        </button>
        {/* <Chat receiverId={selectedUser.id} senderId={user.userId} /> */}
      </div>
    ) : (
      <>
        <h2 className="text-3xl font-semibold text-black mb-6">
          Find Your SportBuddy
        </h2>

        {loading ? (
          <div className="text-center text-white flex flex-col items-center">
            <p className="mt-4">Loading SportBuddies...</p>
          </div>
        ) : error ? (
          <p className="text-center text-red-400 font-semibold">{error}</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-300">No SportBuddies available yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map((u) => (
              <div
                key={u.id}
                onClick={() => handleUserSelect(u)}
                className="bg-gray-800/40 backdrop-blur-lg shadow-lg rounded-lg p-6 hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <h3 className="text-xl font-medium text-gray-900">
                  {u.first_name} {u.last_name}
                </h3>
                <p className="text-gray-900 text-sm mt-2">@{u.username}</p>
              </div>
            ))}
          </div>
        )}
      </>
    )}
  </div>
</div>
  );
}

export default UserList;