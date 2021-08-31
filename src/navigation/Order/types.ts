import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {RouteProp, NavigatorScreenParams} from '@react-navigation/native';
import {CombinedNavigationProp} from '..';

export type TopTabParamList = {
  requests: undefined;
  active: undefined;
  delivered: undefined;
  rejected: undefined;
};

export type RequestScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<TopTabParamList, 'requests'>;
};
export type ActiveScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<TopTabParamList, 'active'>;
};
export type CompletedScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<TopTabParamList, 'delivered'>;
};

export type RejectedScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<TopTabParamList, 'rejected'>;
};