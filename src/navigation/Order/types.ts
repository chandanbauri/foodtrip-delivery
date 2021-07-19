import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {RouteProp, NavigatorScreenParams} from '@react-navigation/native';

export type TopTabParamList = {
  requests: undefined;
  active: undefined;
  completed: undefined;
};

export type RequestScreenProps = {
  navigation: MaterialTopTabNavigationProp<TopTabParamList, 'requests'>;
  route: RouteProp<TopTabParamList, 'requests'>;
};
export type ActiveScreenProps = {
  navigation: MaterialTopTabNavigationProp<TopTabParamList, 'active'>;
  route: RouteProp<TopTabParamList, 'active'>;
};
export type CompletedScreenProps = {
  navigation: MaterialTopTabNavigationProp<TopTabParamList, 'completed'>;
  route: RouteProp<TopTabParamList, 'completed'>;
};
