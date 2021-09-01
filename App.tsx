import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './src/navigation/root';
import {enableScreens} from 'react-native-screens';
import RNBootSplash from 'react-native-bootsplash';
import {AuthProvider} from './src/contexts/auth';

const App = () => {
  React.useEffect(() => {
    // app.intializeSecondaryApp().catch(error => {});

    RNBootSplash.hide({fade: true});
  });
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
