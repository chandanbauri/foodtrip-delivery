import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {customColor} from '../../theme';
import OrderNavigator from '../Order';

type HelperParamList = {
  Orders: undefined;
};
const Helper = createStackNavigator<HelperParamList>();

const HelperStackNavigator = () => {
  return (
    <Helper.Navigator
      screenOptions={{
        headerTitle: 'Orders',
        headerTitleStyle: {
          color: customColor.brown,
        },
        headerTitleAlign: 'center',
        headerLeft: () => null,
      }}>
      <Helper.Screen name="Orders" component={OrderNavigator} />
    </Helper.Navigator>
  );
};

export default HelperStackNavigator;
