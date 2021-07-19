import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import HomeScreen from '../../pages/home';

export type TabNavigatorParamList = {
  home: undefined;
  profile: undefined;
  notification: undefined;
};

export type HomeScreenProps = {
  route: RouteProp<TabNavigatorParamList, 'home'>;
  navigation: BottomTabNavigationProp<TabNavigatorParamList, 'home'>;
};

export type ProfileScreenProps = {
  route: RouteProp<TabNavigatorParamList, 'profile'>;
  navigation: BottomTabNavigationProp<TabNavigatorParamList, 'profile'>;
};

export type NotificationScreenProps = {
  route: RouteProp<TabNavigatorParamList, 'notification'>;
  navigation: BottomTabNavigationProp<TabNavigatorParamList, 'profile'>;
};
