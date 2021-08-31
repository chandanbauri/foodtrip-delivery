import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {CombinedNavigationProp} from '..';
import HomeScreen from '../../pages/home';
import {HelperParamList} from '../helper';

export type TabNavigatorParamList = {
  home: NavigatorScreenParams<HelperParamList>;
  profile: undefined;
  notification: undefined;
};

export type HomeScreenProps = {
  route: RouteProp<TabNavigatorParamList, 'home'>;
  navigation: CombinedNavigationProp;
};

export type ProfileScreenProps = {
  route: RouteProp<TabNavigatorParamList, 'profile'>;
  navigation: CombinedNavigationProp;
};

export type NotificationScreenProps = {
  route: RouteProp<TabNavigatorParamList, 'notification'>;
  navigation: CombinedNavigationProp;
};
