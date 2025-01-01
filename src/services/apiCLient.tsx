import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

// Add request interceptor to include session in all requests
apiClient.interceptors.request.use(async config => {
  try {
    const sessionJwt = await AsyncStorage.getItem('sessionJwt');
    if (sessionJwt) {
      // Set the session cookie
      config.headers.Cookie = `session=${JSON.stringify({jwt: sessionJwt})}`;
    }
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

export default apiClient;
