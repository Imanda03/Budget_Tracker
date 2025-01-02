import {AxiosError} from 'axios';
import {useMutation} from 'react-query';
import {ApiError, CategoryFormData} from '../utils/types';
import apiClient from './apiCLient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createCategory = () => {
  return useMutation<any, AxiosError<ApiError>, CategoryFormData>(
    async (data: CategoryFormData) => {
      try {
        const sessionJwt = await AsyncStorage.getItem('sessionJwt');
        const response = await apiClient.post(
          `${process.env.API_URL}/category/create`,
          data,
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
    },
  );
};

export const getCategory = async () => {
  try {
    const sessionJwt = await AsyncStorage.getItem('sessionJwt');
    const response = await apiClient.get(`${process.env.API_URL}/category`, {
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

export const deleteCategory = async (id: string) => {
  try {
    const sessionJwt = await AsyncStorage.getItem('sessionJwt');
    const response = await apiClient.delete(
      `${process.env.API_URL}/category/${id}`,
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
