import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabNavigatorParamList} from './types';
import HomeScreen from '../../pages/home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../../pages/profile';
import NotificationScreen from '../../pages/notification';
import OrderNavigator from '../Order';
import HelperStackNavigator from '../helper';
import {Text} from 'native-base';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'home':
              iconName = focused ? 'home-variant' : 'home-variant-outline';
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            case 'profile':
              iconName = focused ? 'user' : 'user-o';
              return <FontAwesome name={iconName} size={size} color={color} />;
            case 'notification':
              iconName = focused ? 'mail-open' : 'mail-open-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarLabel: ({focused, color}) => {
          let label;
          switch (route.name) {
            case 'home':
              return (
                <Text fontSize="xxs" color={color}>
                  Home
                </Text>
              );

            case 'profile':
              return (
                <Text fontSize="xxs" color={color}>
                  Profile
                </Text>
              );
            case 'notification':
              return (
                <Text fontSize="xxs" color={color}>
                  Notification
                </Text>
              );
          }
        },
      })}>
      <Tab.Screen name="notification" component={NotificationScreen} />
      <Tab.Screen name="home" component={HelperStackNavigator} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
