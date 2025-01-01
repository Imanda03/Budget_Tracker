import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

interface AuthContextType {
  authToken: string | null;
  userId: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('sessionJwt');
      setAuthToken(null);
      setUserId(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const loadAuthData = async () => {
    try {
      const token = await AsyncStorage.getItem('sessionJwt');

      if (token) {
        setAuthToken(token);
        // try {
        //   const decoded: any = jwtDecode(token);
        //   setUserId(decoded.id);
        // } catch (error) {
        //   console.error('Token decode error:', error);
        //   await logout();
        // }
      }
    } catch (error) {
      console.error('Load auth data error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAuthData();
  }, []);

  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem('sessionJwt', token);

      setAuthToken(token);

      // const decoded: any = jwtDecode(token);
      // setUserId(decoded.id);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        userId,
        login,
        logout,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
