import * as React from 'react';
import {StatusBar} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import {StatusBarProps} from 'react-native';

const FocusedStatusBar = (props: StatusBarProps) => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
};

export default FocusedStatusBar;
