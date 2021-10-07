import * as React from 'react';
import {Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {rootStackParamList} from './types';
import SignInScreen from '../../pages/auth/signIn';
import {NativeBaseProvider} from 'native-base';
import TabNavigator from '../tab';
import {AuthContext} from '../../contexts/auth';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/core';
import {CombinedNavigationProp} from '..';

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
  React.useEffect(() => {
    // Listining for Foreground messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const message = remoteMessage;
      if (message.notification?.title)
        Alert.alert(message.notification?.title, message.notification?.body);
    });

    return unsubscribe;
  });

  React.useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      // console.log(
      //   'Notification caused app to open from background state:',
      //   remoteMessage.notification,
      // );
      // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          // console.log(
          //   'Notification caused app to open from quit state:',
          //   remoteMessage.notification,
          // );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });
  }, []);
  return (
    <NativeBaseProvider config={config}>
      <RootStack.Navigator
        screenOptions={{
          headerLeft: () => null,
        }}>
        {Auth && !Auth.user ? (
          <RootStack.Screen
            name="signin"
            component={SignInScreen}
            options={{headerShown: false}}
          />
        ) : (
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
