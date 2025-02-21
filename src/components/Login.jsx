import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiLogin } from '../Services/authSevice';
import { useAuth } from './AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');  

    try {
      const data = await apiLogin(email, password);

      if (data.access_token) {
        login(data.access_token);
        navigate('/open-playdates');
      }
      
    } catch (error) {
      console.log(error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex justify-center bg-purple-300 items-center min-h-screen bg-[url(/assets/login.avif)] bg-cover bg-no-repeat bg-center bg-blend-overlay">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm opacity-80">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Login</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Don&lsquo;t have an account? 
            <a href="/add-user" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;