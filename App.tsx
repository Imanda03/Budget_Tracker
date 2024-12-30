import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemeProvider from './src/context/ThemeProvider';
import RootStack from './RouteNavigation';
// import 'react-native-reanimated';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ThemeProvider>
          <RootStack />
        </ThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
