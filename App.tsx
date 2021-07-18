import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './src/navigation/root';

const App = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default App;
