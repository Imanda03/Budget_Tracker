import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from '../src/screen/auth/LandingScreen';
import AuthRoute from './StackRoute/AuthRoute';
import Tabs from './Tabs';
import InnerScreen from './StackRoute/InnerScreen';
import {useAuth} from '../src/context/AuthContext';

const RootStack = () => {
  const Stack = createNativeStackNavigator();

  const {authToken} = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        contentStyle: {backgroundColor: 'black'},
        animationDuration: 3500,
      }}>
      {authToken ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="InnerScreen"
            component={InnerScreen}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <Stack.Screen
          name="Auths"
          component={AuthRoute}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
