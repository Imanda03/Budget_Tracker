import axios, {AxiosError} from 'axios';
import {useMutation} from 'react-query';
import {
  ApiError,
  currentUserPayload,
  loginData,
  userDataProps,
} from '../utils/types';
import apiClient from './apiCLient';
import {useAuth} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userRegister = () => {
  return useMutation<any, AxiosError<ApiError>, userDataProps>(
    async (registerData: userDataProps) => {
      try {
        const response = await axios.post(
          `${process.env.API_URL}/auth/register`,
          registerData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  );
};

export const useLogin = () => {
  const {login} = useAuth();
  return useMutation<any, AxiosError<ApiError>, loginData>(
    async (loginData: loginData) => {
      try {
        const response = await axios.post(
          `${process.env.API_URL}/auth/login`,
          loginData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const cookies = response.headers['set-cookie'];
        if (cookies) {
          const sessionCookie = cookies.find(cookie =>
            cookie.startsWith('session='),
          );
          if (sessionCookie) {
            // Parse the session cookie to get the JWT
            const cookieValue = decodeURIComponent(
              sessionCookie.split(';')[0].split('=')[1],
            );
            await login(cookieValue);
          }
        }

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  );
};

export const userLogout = () => {
  return useMutation<any, AxiosError<ApiError>, ''>(async (data: string) => {
    try {
      const response = await axios.post(`${process.env.API_URL}/auth/signout`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  });
};

export const getUserDetails = async () => {
  try {
    const sessionJwt = await AsyncStorage.getItem('sessionJwt');
    const response = await apiClient.get(
      `${process.env.API_URL}/auth/currentUser`,
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: `session=${JSON.stringify({jwt: sessionJwt})}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data: currentUserPayload) => {
  try {
    const sessionJwt = await AsyncStorage.getItem('sessionJwt');
    const response = await axios.put(`${process.env.API_URL}/auth/`, data, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: `session=${JSON.stringify({jwt: sessionJwt})}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
