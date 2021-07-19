import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {rootStackParamList} from './types';
import SignInScreen from '../../pages/auth/signIn';
import {NativeBaseProvider} from 'native-base';
import TabNavigator from '../tab';
import {customColor} from '../../theme';

const RootStack = createStackNavigator<rootStackParamList>();

const RootStackNavigator = () => {
  const config = {
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient').default,
    },
  };
  return (
    <NativeBaseProvider config={config}>
      <RootStack.Navigator
        screenOptions={{
          headerLeft: () => null,
        }}>
        <RootStack.Screen
          name="signin"
          component={SignInScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="TabNav"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NativeBaseProvider>
  );
};

export default RootStackNavigator;
