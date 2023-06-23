import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth.hook';


const AuthContext = createContext({
  user: null,
  isInitializing: false,
  signInWithGoogle: async () => { },
  signInWithCredentials: async (email, password) => { },
  signUpWithEmailAndPassword: async (email, password) => { },
  signOutFromAccount: async () => { },
  resetPassword: async (email) => { },
  error: ''
});

export const AuthContextProvider = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
