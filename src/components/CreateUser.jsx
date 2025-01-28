import { useState } from "react";
import { createUser } from "../Services/userService";
import { Link } from "react-router-dom";

function CreateUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(null);
  const [message, setMessage] = useState("");
  const [formVisible, setFormVisible] = useState(true); 


  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      first_name: firstName,
      last_name: lastName,
      username: userName,
      email: email,
      password: password,
    };

    try {
      const result = await createUser(userData);
      setUserCreated(result);
      setMessage(""); 
      setFormVisible(false); 

      setFirstName("");
      setLastName("");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to create user!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-100 bg-[url(/assets/racetrack.avif)] bg-blend-overlay bg-cover bg-no-repeat bg-center">
      <div className="w-full max-w-md p-6 bg-white-500 bg-opacity-25 rounded-lg shadow-lg transition-all duration-500">
        {formVisible && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
              User Registration
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-gray-700">First Name:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter First Name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-gray-700">Last Name:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter Last Name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-gray-700">User Name:</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter User Name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-gray-700">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-gray-700">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md shadow-lg hover:from-blue-500 hover:to-green-400 transform transition duration-300 ease-in-out hover:scale-105"
                >
                  Register
                </button>
              </div>
              {message && (
                <p className="mt-4 text-center text-red-600">{message}</p>
              )}
            </form>
          </div>
        )}

        {userCreated && !formVisible && (
          <div className="fade-in text-center mt-6">
            <h3 className="font-bold text-green-600 mb-4">
              User created successfully!
            </h3>
            <Link to="/">
              <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-md shadow-lg hover:from-blue-800 hover:to-blue-600 transform transition duration-300 ease-in-out hover:scale-105">
                Go to Home
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateUser;