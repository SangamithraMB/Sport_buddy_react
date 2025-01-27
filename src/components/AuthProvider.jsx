
import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext'; // Import AuthContext
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';


const getUser = (jwtToken) => {
    const decodedObject = jwtDecode(jwtToken)
    return {
        userId: decodedObject.userId,
        email: decodedObject.email,
        firstName: decodedObject.firstName,
        lastName: decodedObject.lastName,
        userName: decodedObject.sub //identity is sub in token
    }
}
// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => { 
    const jwtToken = localStorage.getItem('jwtToken')
    return jwtToken ? getUser(jwtToken) : null;
    });

  const login = (newToken) => {
    const userObj = getUser(newToken);
    setUser(userObj);
    localStorage.setItem('jwtToken', newToken);
    console.log(jwtDecode(newToken));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jwtToken');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setUser(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};