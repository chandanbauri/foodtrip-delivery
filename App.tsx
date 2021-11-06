import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './src/navigation/root';
import {enableScreens} from 'react-native-screens';
import RNBootSplash from 'react-native-bootsplash';
import {AuthProvider} from './src/contexts/auth';
import {BackHandler, ToastAndroid} from 'react-native';
const App = () => {
  const exitApp = React.useRef<number>(0);
  const backAction = () => {
    setTimeout(() => {
      exitApp.current = 0;
    }, 2000); // 2 seconds to tap second-time

    if (exitApp.current === 0) {
      exitApp.current = 1;
      ToastAndroid.show(
        'Double Click on the back button to exit',
        ToastAndroid.SHORT,
      );
      return true;
    }
    if (exitApp.current === 1) {
      BackHandler.exitApp();
    }
    return true;
  };
  React.useEffect(() => {
    // app.intializeSecondaryApp().catch(error => {});

    RNBootSplash.hide({fade: true});
  });
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  enableScreens();
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
