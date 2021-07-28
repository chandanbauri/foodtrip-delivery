import {RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import * as React from 'react';
import DeliveryScreen from '../../pages/Deliver';
import DetailsScreen from '../../pages/Details';
import {customColor} from '../../theme';
import OrderNavigator from '../Order';

export type HelperParamList = {
  Orders: undefined;
  Details: undefined;
  Delivery: undefined;
};
export type DetailsScreenProps = {
  route?: RouteProp<HelperParamList, 'Details'>;
  navigation?: StackNavigationProp<HelperParamList, 'Details'>;
};
export type DeliveryScreenProps = {
  route?: RouteProp<HelperParamList, 'Delivery'>;
  navigation?: StackNavigationProp<HelperParamList, 'Delivery'>;
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
      <Helper.Screen name="Details" component={DetailsScreen} />
      <Helper.Screen name="Delivery" component={DeliveryScreen} />
    </Helper.Navigator>
  );
};

export default HelperStackNavigator;
