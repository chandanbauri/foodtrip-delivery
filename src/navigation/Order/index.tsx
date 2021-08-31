import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from '../../pages/home';
import OrderScreen from '../../pages/orders';
import {TopTabParamList} from './types';
import CompletedOrders from '../../pages/completeOrders';
import RejectedOrders from '../../pages/RejectedOrders';

const Order = createMaterialTopTabNavigator<TopTabParamList>();

const OrderNavigator = () => {
  return (
    <Order.Navigator>
      <Order.Screen name="requests" component={HomeScreen} />
      <Order.Screen name="active" component={OrderScreen} />
      <Order.Screen name="delivered" component={CompletedOrders} />
      <Order.Screen name="rejected" component={RejectedOrders} />
    </Order.Navigator>
  );
};

export default OrderNavigator;
