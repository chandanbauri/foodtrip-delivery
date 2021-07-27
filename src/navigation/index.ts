import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HelperParamList} from './helper';
import {TopTabParamList} from './Order/types';
import {rootStackParamList} from './root/types';
import {TabNavigatorParamList} from './tab/types';

export type CombinedNavigationProp = CompositeNavigationProp<
  StackNavigationProp<rootStackParamList, keyof rootStackParamList>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabNavigatorParamList, keyof TabNavigatorParamList>,
    CompositeNavigationProp<
      StackNavigationProp<HelperParamList, keyof HelperParamList>,
      MaterialTopTabNavigationProp<TopTabParamList, keyof TopTabParamList>
    >
  >
>;
