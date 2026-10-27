import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/users/login', { email, password });
    setUser(data); localStorage.setItem('user', JSON.stringify(data)); localStorage.setItem('token', data.token);
  };

  const logout = () => { setUser(null); localStorage.removeItem('user'); localStorage.removeItem('token'); };

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{!loading && children}</AuthContext.Provider>;
};