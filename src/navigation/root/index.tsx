import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {rootStackParamList} from './types';
import SignInScreen from '../../pages/auth/signIn';
import {NativeBaseProvider} from 'native-base';

const RootStack = createStackNavigator<rootStackParamList>();

const RootStackNavigator = () => {
  return (
    <NativeBaseProvider>
      <RootStack.Navigator>
        <RootStack.Screen
          name="signin"
          component={SignInScreen}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NativeBaseProvider>
  );
};

export default RootStackNavigator;
