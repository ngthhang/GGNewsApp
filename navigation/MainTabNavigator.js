import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SavedScreen from '../screens/SavedScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='home'
    />
  ),
};

HomeStack.path = '';

const SavedStack = createStackNavigator(
  {
    Save: SavedScreen,
  },
  config
);

SavedStack.navigationOptions = {
  tabBarLabel: 'Save',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name='book' />
  ),
};

SavedStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SavedStack
});

tabNavigator.path = '';

export default tabNavigator;
