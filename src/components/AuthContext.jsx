import { useContext,createContext } from 'react';

// Create and export AuthContext
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);