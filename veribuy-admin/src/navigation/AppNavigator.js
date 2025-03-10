// src/navigation/AppNavigator.js
import React from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import Dashboard from '../screens/Dashboard';
import Orders from '../screens/Orders';
import Products from '../screens/Products';
import Tasks from '../screens/Tasks';
import Settings from '../screens/Settings';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const { width } = useWindowDimensions();
  const isLargeScreen = Platform.OS === 'web' && width > 1024;

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#333' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        drawerActiveTintColor: '#2196F3',
        drawerType: isLargeScreen ? 'permanent' : 'front',
        drawerStyle: isLargeScreen ? { width: 200 } : { width: 240 },
        swipeEnabled: !isLargeScreen, // Disable swipe for large screens
      }}
    >
      <Drawer.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Tasks" 
        component={Tasks} 
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Orders" 
        component={Orders} 
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Products" 
        component={Products} 
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={Settings} 
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
