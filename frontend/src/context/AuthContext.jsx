import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        if (response.success) {
          setUser(response.data);
        } else {
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Verify token failed:', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // Login User
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        setUser({
          _id: response.data._id,
          username: response.data.username,
          email: response.data.email,
          githubToken: response.data.githubToken
        });
        return { success: true };
      }
    } catch (err) {
      setError(err.message || 'Login failed');
      return { success: false, message: err.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  // Signup User
  const signup = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/signup', { username, email, password });
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        setUser({
          _id: response.data._id,
          username: response.data.username,
          email: response.data.email,
          githubToken: response.data.githubToken
        });
        return { success: true };
      }
    } catch (err) {
      setError(err.message || 'Signup failed');
      return { success: false, message: err.message || 'Signup failed' };
    } finally {
      setLoading(false);
    }
  };

  // Logout User
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
