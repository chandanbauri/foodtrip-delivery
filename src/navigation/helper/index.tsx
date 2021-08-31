import {RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import * as React from 'react';
import {CombinedNavigationProp} from '..';
import DeliveryScreen from '../../pages/Deliver';
import DetailsScreen from '../../pages/Details';
import {customColor} from '../../theme';
import OrderNavigator from '../Order';

export type HelperParamList = {
  Orders: undefined;
  Details: {
    order: any;
  };
  Delivery: {
    order: any;
  };
};
export type DetailsScreenProps = {
  route: RouteProp<HelperParamList, 'Details'>;
  navigation: CombinedNavigationProp;
};
export type DeliveryScreenProps = {
  route: RouteProp<HelperParamList, 'Delivery'>;
  navigation: CombinedNavigationProp;
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
      }}
      initialRouteName="Orders">
      <Helper.Screen name="Orders" component={OrderNavigator} />
      <Helper.Screen name="Details" component={DetailsScreen} />
      <Helper.Screen name="Delivery" component={DeliveryScreen} />
    </Helper.Navigator>
  );
};

export default HelperStackNavigator;
