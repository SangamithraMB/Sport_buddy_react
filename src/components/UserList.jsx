import { useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: '', first_name: '', last_name: '', email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { ...formData, id: Date.now() };
    setUsers([...users, newUser]);
    setFormData({ username: '', first_name: '', last_name: '', email: '', password: '' });
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      <h2>Users</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} required />
        <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleInputChange} required />
        <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
        <button type="submit">Add User</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.username}</strong> ({user.email}) 
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;