import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {rootStackParamList} from './types';
import SignInScreen from '../../pages/auth/signIn';
import {NativeBaseProvider} from 'native-base';
import TabNavigator from '../tab';
import {AuthContext} from '../../contexts/auth';
import auth from '@react-native-firebase/auth';
const RootStack = createStackNavigator<rootStackParamList>();

const RootStackNavigator = () => {
  const config = {
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient').default,
    },
  };

  const Auth = React.useContext(AuthContext);
  const onAuthStateChnage = (user: any) => {
    if (user) {
      Auth?.setUser(user);
    }
  };

  React.useEffect(() => {
    let subscribe = auth().onAuthStateChanged(onAuthStateChnage);
    return subscribe;
  });
  return (
    <NativeBaseProvider config={config}>
      <RootStack.Navigator
        screenOptions={{
          headerLeft: () => null,
        }}>
        {!Auth?.user && (
          <RootStack.Screen
            name="signin"
            component={SignInScreen}
            options={{headerShown: false}}
          />
        )}
        {Auth?.user && (
          <RootStack.Screen
            name="TabNav"
            component={TabNavigator}
            options={{headerShown: false}}
          />
        )}
      </RootStack.Navigator>
    </NativeBaseProvider>
  );
};

export default RootStackNavigator;
