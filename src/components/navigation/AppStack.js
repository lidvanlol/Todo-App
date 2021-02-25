import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';



import {
 
  TodoFormScreen,
  SettingsScreen,
  TodoListScreen,
 TodoDetailsScreen,
  SearchScreen,
} from '../../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Stack = createStackNavigator();


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TodoList"
        component={TodoListScreen}
        options={{
          tabBarLabel: 'Todo List',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="list-circle" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="TodoForm"
        component={TodoFormScreen}
        options={{
          tabBarLabel: 'Todo Form',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}




const AppStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Tabs"
          options={{headerShown: false}}
          component={MyTabs}
        />
        <Stack.Screen
          name="TodoDetails"
          options={{headerShown: false}}
          component={TodoDetailsScreen}
        />
      </Stack.Navigator>
    );
};

export default AppStack;
