import { Text, View, StatusBar, FlatList, StyleSheet} from 'react-native';
import { NavigationContainer, PrivateValueStore } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useState } from 'react';

// Screens
import {MapScreen} from './Tabs/Map.js';
import {TreeList} from './Tabs/TreeList.js';
import {SettingsScreen} from './Tabs/Settings.js';
import AccountScreen from './Tabs/Account.js';
import LoginScreen from './Tabs/Login.js';
import {TreeInfo} from './Tabs/TreeInfo.js';

import { connect, Provider } from 'react-redux';
import store from './Tabs/redux/store.js';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainScreens(props) {
  const [iconColor, setIconColor] = useState('green');
  return <Tab.Navigator
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
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Trees" component={TreeList} />
        <Tab.Screen name="Account" component={AccountScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
}

function App() {
  const [treeData, setTreeData] = useState(null);

  const colors = {
    background: '#91AE6E',
    button: '#F2F2F2',
    valid: '#689D4B',
    invalid: '#D96868'
  }
  const [theme, setTheme] = useState(colors);

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={({ route }) => ({headerShown: false, animation: 'fade_from_bottom'})}>
        {/* <Stack.Screen name="LoginScreen" component={LoginScreen}/> */}
        <Stack.Screen name="MainScreens" component={MainScreens}/>
        <Stack.Screen name="TreeInfo" component={TreeInfo}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;

