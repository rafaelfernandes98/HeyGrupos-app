import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../pages/SignIn';
import { ChatRoom } from '../pages/ChatRoom';
import { Messages } from '../pages/Messages';
import { StackParamList } from '../types/Route';
import Search from '../pages/Search';

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
      <AppStack.Screen
        name="Messages"
        component={Messages}
        options={({ route }) => ({
          title: (route.params as StackParamList)?.thread?.name,
        })}
      />

      <AppStack.Screen
        name="Search"
        component={Search}
        options={() => ({
          title: 'Procurando algum grupo?',
        })}
      />
    </AppStack.Navigator>
  );
}
