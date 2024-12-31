import axios, {AxiosError} from 'axios';
import {useMutation} from 'react-query';
import {ApiError, userDataProps} from '../utils/types';

export const userRegister = () => {
  return useMutation<any, AxiosError<ApiError>, userDataProps>(
    async (registerData: userDataProps) => {
      try {
        const response = await axios.post(
          `http://192.168.68.173:6000/api/auth/register`,
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
