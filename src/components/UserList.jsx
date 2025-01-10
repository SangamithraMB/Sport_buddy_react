import { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/users', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
      },
    })
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(err => {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users');
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Users</h2>
      {error && <p>{error}</p>}
      <ul>
        {users.length ? (
          users.map(user => (
            <li key={user.id}>
              {user.first_name} {user.last_name} ({user.username})
            </li>
          ))
        ) : (
          <li>No users found.</li>
        )}
      </ul>
    </div>
  );
};

export default UserList;