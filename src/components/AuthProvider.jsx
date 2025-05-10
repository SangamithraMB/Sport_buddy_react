
import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext'; // Import AuthContext
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';


const getUser = (jwtToken) => {
  if (!jwtToken) return null;
   try {
    const decodedObject = jwtDecode(jwtToken)
    return {
        userId: decodedObject.userId,
        email: decodedObject.email,
        firstName: decodedObject.firstName,
        lastName: decodedObject.lastName,
        userName: decodedObject.sub //identity is sub in token
    };
  } catch (error) {
    console.error('Error getting user from token:', error);
    return null;
  }
};
// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("jwtToken");
  const [user, setUser] = useState(storedToken);

  const [token, setToken] = useState(storedToken);

  const login = (newToken) => {
    const userObj = getUser(newToken);
    setUser(userObj);
    localStorage.setItem('jwtToken', newToken);
    console.log(jwtDecode(newToken));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('jwtToken');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setUser(getUser(storedToken));
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};