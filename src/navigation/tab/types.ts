import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import HomeScreen from '../../pages/home';

export type TabNavigatorParamList = {
  home: undefined;
  profile: undefined;
};

export type HomeScreenProps = {
  route: RouteProp<TabNavigatorParamList, 'home'>;
  navigation: BottomTabNavigationProp<TabNavigatorParamList, 'home'>;
};
