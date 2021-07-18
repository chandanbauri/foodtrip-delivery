import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type rootStackParamList = {
  signin: undefined;
};

// Profile Screen Props

export type SiginScreenProps = {
  route: RouteProp<rootStackParamList, 'signin'>;
  navigation: StackNavigationProp<rootStackParamList, 'signin'>;
};
