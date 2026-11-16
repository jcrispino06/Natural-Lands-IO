import { Text, View, StatusBar, FlatList, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useState } from 'react';

import {MapScreen} from './Tabs/Map.js';
import {TreeList} from './Tabs/TreeList.js';
import {SettingsScreen} from './Tabs/Settings.js';
import {AccountScreen} from './Tabs/Account.js';

const Tab = createBottomTabNavigator();

export default function App() {
  const [iconColor, setIconColor] = useState('green');
  const [treeData, setTreeData] = useState(trees);

  const colors = {
    background: '#91AE6E',
    button: '#F2F2F2',
    valid: '#689D4B',
    invalid: '#D96868'
  }
  const [theme, setTheme] = useState(colors);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Map') {
              iconName = focused
                 ? 'map' : 'map-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'cog' : 'cog-outline';
            } else if (route.name === 'Trees') {
                iconName = focused ? 'list' : 'list-outline'
            } else if (route.name === 'Account') {
                iconName = focused ? 'person' : 'person-outline'
            }
 // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
	tabBarActiveTintColor: iconColor,
   	tabBarInactiveTintColor: 'gray',
    headerShown: false, 
    tabBarStyle: { position: 'absolute' },
    tabBarBackground: () => (
      <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
    )
  })}>
        <Tab.Screen name="Map" component={MapScreen} initialParams={{treeData: treeData, colors: theme}}/>
        <Tab.Screen name="Trees" component={TreeList} initialParams={{trees:{data: treeData}, theme: {colors: theme}}}/>
        <Tab.Screen name="Account" component={AccountScreen} initialParams={{treeData: treeData, colors: theme}}/>
        <Tab.Screen name="Settings" component={SettingsScreen} initialParams={{treeData: treeData, theme: theme}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

