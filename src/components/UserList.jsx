import { useEffect, useState } from 'react';
import { fetchUsers } from '../Services/userService';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await fetchUsers();
        console.log('userData', userData)
        setUsers(userData);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError('Failed to fetch user data, please try again later.');
      } finally {
        setLoading(false); 
      }
    };

    getUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Users</h2>

      {loading ? (
        <p>Loading...</p> 
      ) : error ? (
        <p>{error}</p> 
      ) : users.length === 0 ? (
        <p>No users found.</p> 
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.first_name} {user.last_name} ({user.username})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;