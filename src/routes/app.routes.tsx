import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../pages/SignIn';
import { ChatRoom } from '../pages/ChatRoom';

// export type StackRoutes = {
//   SignIn: undefined;
//   ChatRoom: undefined;
// };

const AppStack = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <AppStack.Navigator initialRouteName="ChatRoom">
      <AppStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: 'Faça login',
        }}
      />

      <AppStack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{
          headerShown: false,
        }}
      />
    </AppStack.Navigator>
  );
}
