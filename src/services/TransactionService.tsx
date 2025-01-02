import axios, {AxiosError} from 'axios';
import {useMutation} from 'react-query';
import {ApiError, transactionData} from '../utils/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createTransaction = () => {
  return useMutation<any, AxiosError<ApiError>, transactionData>(
    async (data: transactionData) => {
      try {
        const sessionJwt = await AsyncStorage.getItem('sessionJwt');
        const response = await axios.post(
          `${process.env.API_URL}/transaction/`,
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

export const getLatestTransaction = async () => {
  try {
    const sessionJwt = await AsyncStorage.getItem('sessionJwt');
    const response = await axios.get(
      `${process.env.API_URL}/transaction/latest`,
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

export const getTransaction = async () => {
  try {
    const sessionJwt = await AsyncStorage.getItem('sessionJwt');
    const response = await axios.get(`${process.env.API_URL}/transaction`, {
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

export const getBalanceTransaction = async () => {
  try {
    const sessionJwt = await AsyncStorage.getItem('sessionJwt');
    const response = await axios.get(
      `${process.env.API_URL}/transaction/totalBalance`,
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

export const deleteTransaction = async (id: string) => {
  try {
    const sessionJwt = await AsyncStorage.getItem('sessionJwt');
    const response = await axios.delete(
      `${process.env.API_URL}/transaction/${id}`,
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
