import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {rootStackParamList} from './types';
import SignInScreen from '../../pages/auth/signIn';
import {NativeBaseProvider} from 'native-base';
import TabNavigator from '../tab';
import {AuthContext} from '../../contexts/auth';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
const RootStack = createStackNavigator<rootStackParamList>();
const credentials = {
  apiKey: 'AIzaSyBMmVYbIT0li0iIFAQyqesI0XgxBplY7K4',
  authDomain: 'foodadda3-3aeca.firebaseapp.com',
  projectId: 'foodadda3-3aeca',
  storageBucket: 'foodadda3-3aeca.appspot.com',
  messagingSenderId: '348529372287',
  appId: '1:1093723294271:android:6b620dacb9a802ea26868a',
  measurementId: 'G-3X6SXH6GT7',
  databaseURL: 'https://foodadda3-3aeca-default-rtdb.firebaseio.com/',
};

const config = {
  name: 'SECONDARY_APP',
};
const intializeSecondaryApp = async () => {
  let isIinitialized = firebase.apps.findIndex(
    item => item.name == config.name,
  );
  if (isIinitialized == -1) {
    firebase.initializeApp(credentials, config);
  }
};
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
    } else {
      Auth?.setUser(null);
    }
  };
  intializeSecondaryApp();
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
