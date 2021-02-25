import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
import {
  LoginScreen,
  RegistrationScreen,
 
} from '../../screens/';

const AuthStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
};

export default AuthStack;
