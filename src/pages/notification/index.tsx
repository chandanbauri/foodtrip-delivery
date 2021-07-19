import {Box, FlatList, Text} from 'native-base';
import * as React from 'react';
import {Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {flexGrow} from 'styled-system';
import NotificationCard from '../../components/cards/Notification';
import FocusedStatusBar from '../../components/general/statusBar';

const {height, width} = Dimensions.get('window');
function NotificationScreen() {
  let data = Array.apply(null, Array(8)).map(
    (item, index: number) => `item ${index}`,
  );
  return (
    <>
      <FocusedStatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      <Box bg="white" flex={1}>
        <SafeAreaView />
        <Box
          width={width}
          pl={5}
          pt={5}
          position="absolute"
          top={0}
          left={0}
          right={0}
          height={height * 0.15}
          justifyContent="center">
          <Text fontSize="3xl" color="gray.800">
            Notifications
          </Text>
        </Box>
        <Box mt={height * 0.1} width={width} mb={5}>
          <FlatList
            data={data}
            keyExtractor={item => item}
            renderItem={() => <NotificationCard />}
          />
        </Box>
      </Box>
    </>
  );
}

export default NotificationScreen;
