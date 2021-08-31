import {RouteProp, NavigatorScreenParams} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CombinedNavigationProp} from '..';
import {TabNavigatorParamList} from '../tab/types';

export type rootStackParamList = {
  signin: undefined;
  TabNav: NavigatorScreenParams<TabNavigatorParamList>;
};

// Profile Screen Props

export type SiginScreenProps = {
  route: RouteProp<rootStackParamList, 'signin'>;
  navigation: CombinedNavigationProp;
};

