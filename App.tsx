import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './src/navigation/root';
import {enableScreens} from 'react-native-screens';
import RNBootSplash from 'react-native-bootsplash';

const App = () => {
  React.useEffect(() => {
    RNBootSplash.hide({fade: true});
  });
  enableScreens();
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default App;
