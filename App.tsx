import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './src/navigation/root';
import {enableScreens} from 'react-native-screens';

const App = () => {
  enableScreens();
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default App;
