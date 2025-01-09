import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: '', first_name: '', last_name: '', email: '', password: '' });

  // Load users from localStorage on initial load
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  // Save users to localStorage when it changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission to add a new user
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email already exists
    if (users.some(user => user.email.toLowerCase() === formData.email.toLowerCase())) {
      alert('This email is already registered.');
      return;
    }

    if (!formData.username || !formData.first_name || !formData.last_name || !formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    const newUser = { ...formData, id: Date.now() };
    setUsers([...users, newUser]);
    setFormData({ username: '', first_name: '', last_name: '', email: '', password: '' });
  };

  // Handle deleting a user
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // Clear all users
  const handleClearAll = () => {
    const confirmClear = window.confirm('Are you sure you want to clear all users?');
    if (confirmClear) {
      setUsers([]);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Users</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={formData.username} 
            onChange={handleInputChange} 
            className="w-full p-2 border border-gray-300 rounded"
            required 
          />
        </div>
        <div>
          <input 
            type="text" 
            name="first_name" 
            placeholder="First Name" 
            value={formData.first_name} 
            onChange={handleInputChange} 
            className="w-full p-2 border border-gray-300 rounded"
            required 
          />
        </div>
        <div>
          <input 
            type="text" 
            name="last_name" 
            placeholder="Last Name" 
            value={formData.last_name} 
            onChange={handleInputChange} 
            className="w-full p-2 border border-gray-300 rounded"
            required 
          />
        </div>
        <div>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleInputChange} 
            className="w-full p-2 border border-gray-300 rounded"
            required 
          />
        </div>
        <div>
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleInputChange} 
            className="w-full p-2 border border-gray-300 rounded"
            required 
          />
        </div>
        <button 
          type="submit" 
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </form>

      <button 
        type="button" 
        onClick={handleClearAll} 
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Clear All
      </button>

      <ul className="mt-6 space-y-2">
        {users.map(user => (
          <li key={user.id} className="flex justify-between items-center p-2 border-b">
            <span>
              <strong>{user.username}</strong> ({user.email})
            </span>
            <button 
              onClick={() => handleDelete(user.id)} 
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;