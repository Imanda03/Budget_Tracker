import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemeProvider from './src/context/ThemeProvider';
import RootStack from './RouteNavigation';
// import 'react-native-reanimated';
import 'react-native-gesture-handler';
import {ToastProvider} from './src/context/ToastContext';
import {AuthProvider} from './src/context/AuthContext';
import {useEffect, useState} from 'react';
import {AppState, AppStateStatus, Platform} from 'react-native';
import LoadingScreen from './src/components/LoadingScreen';
import {focusManager, QueryClient, QueryClientProvider} from 'react-query';

const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    // Simulate a delay to show the loading screen
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => subscription.remove();
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        onError: (error: any) => {
          if (error?.response?.status === 401) {
            console.log('Unauthorized: Please check your authentication.');
          }
        },
      },
      mutations: {
        onError: (error: any) => {
          if (error?.response?.status === 401) {
            console.log('Unauthorized: Please check your authentication.');
          }
        },
      },
    },
  });

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <ToastProvider>
                {isLoading ? <LoadingScreen /> : <RootStack />}
              </ToastProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
