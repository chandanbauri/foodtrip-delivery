import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabNavigatorParamList} from './types';
import HomeScreen from '../../pages/home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
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
              iconName = focused ? 'user' : 'user-0';
              return <FontAwesome name={iconName} size={size} color={color} />;
          }
        },
      })}>
      <Tab.Screen name="home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
