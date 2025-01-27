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
      setMessage("User created successfully!");

      setFirstName("");
      setLastName("");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage("Failed to create user!", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Create User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-gray-700">First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter First Name"
              className="w-full p-2 border border-gray-300 rounded-md"
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
              className="w-full p-2 border border-gray-300 rounded-md"
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
              className="w-full p-2 border border-gray-300 rounded-md"
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
              className="w-full p-2 border border-gray-300 rounded-md"
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
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Register
            </button>
          </div>
          {message && (
            <p className="mt-4 text-center text-red-600">{message}</p>
          )}
        </form>
        {userCreated ? (
          <div className="mt-4 text-center">
            <h3 className="font-bold text-green-600">
              User created successfully:
            </h3>
            <p>
              {userCreated.first_name} {userCreated.last_name} (
              {userCreated.username})
            </p>
          </div>
        ) : null}
        <Link to="/">
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">Go to Home </button>
      </Link>
      </div>
    </div>
  );
}

export default CreateUser;
