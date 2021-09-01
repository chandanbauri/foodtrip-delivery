import {Box, FlatList, Text} from 'native-base';
import * as React from 'react';
import {ActivityIndicator, Dimensions, RefreshControl} from 'react-native';

import OrderCard from '../../components/cards/Order';
import FocusedStatusBar from '../../components/general/statusBar';
import {HomeScreenProps} from '../../navigation/tab/types';
import {customColor} from '../../theme';
import {addFCMtoke, fetchRequests, getFCMToken, test} from '../../utilities';
import {useIsFocused} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import {requestNotificationPermission} from '../../utilities/permissions/permissions';

const {height, width} = Dimensions.get('window');
const HomeScreen = ({navigation, route}: HomeScreenProps) => {
  const [initializing, setInitializing] = React.useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [list, setList] = React.useState<Array<any>>([]);
  let IsFocused = useIsFocused();
  const getOrders = async () => {
    setInitializing(true);
    setList([]);
    try {
      let res = await firebase
        .app('SECONDARY_APP')
        .firestore()
        .collection('deliveryPartners')
        .doc(auth().currentUser?.uid)
        .collection('requests')
        .get();
      if (res.size >= 1) {
        res.forEach(async item => {
          let data = item.data();
          let blob = await firebase
            .app('SECONDARY_APP')
            .firestore()
            .collection('orders')
            .doc(data.orderId)
            .get();
          let index = list.findIndex(item => item.docId == blob.id);
          if (index == -1)
            setList(prev => {
              return [
                ...prev,
                {...blob.data(), docId: blob.id, reqId: item.id},
              ];
            });
        });
      }
      setInitializing(false);
    } catch (error) {
      throw error;
    }
  };

  const onRefresh = React.useCallback(async () => {
    setInitializing(true);
    setList([]);
    try {
      let res = await firebase
        .app('SECONDARY_APP')
        .firestore()
        .collection('deliveryPartners')
        .doc(auth().currentUser?.uid)
        .collection('requests')
        .get();
      if (res.size >= 1) {
        res.forEach(async item => {
          let data = item.data();
          let blob = await firebase
            .app('SECONDARY_APP')
            .firestore()
            .collection('orders')
            .doc(data.orderId)
            .get();
          let index = list.findIndex(item => item.docId == blob.id);
          // console.log(index);
          if (index == -1)
            setList(prev => {
              return [
                ...prev,
                {...blob.data(), docId: blob.id, reqId: item.id},
              ];
            });
        });
      }
      setInitializing(false);
    } catch (error) {
      throw error;
    }
  }, [refreshing]);
  const saveFCMToken = async () => {
    if (IsFocused) {
      try {
        let token = await getFCMToken();
        // console.log('FCM token:', token);
        await addFCMtoke({FCM: token});
      } catch (error) {
        throw error;
      }
    }

    return;
  };
  React.useEffect(() => {
    if (IsFocused) {
      getOrders().catch(error => {
        throw error;
      });
    }
    return;
  }, [IsFocused]);

  React.useEffect(() => {
    saveFCMToken().catch(error => {
      throw error;
    });
    return;
  }, []);

  React.useEffect(() => {
    requestNotificationPermission().catch(error => {
      throw error;
    });
  }, []);
  if (initializing)
    return (
      <Box alignItems="center" justifyContent="center" flex={1}>
        <FocusedStatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent={true}
        />
        <ActivityIndicator color={customColor.brown} size={50} />
      </Box>
    );
  return (
    <Box width={width}>
      <FocusedStatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      {/* <Container w={width} h={height * 0.1}>
        <Flex w={width} justifyContent="center" alignItems="center">
          <Text bold fontSize="2xl" color={customColor.brown}>
            Orders
          </Text>
        </Flex>
      </Container> */}
      <FlatList
        data={list}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}) => <OrderCard {...item} />}
        ListEmptyComponent={
          <Box mt={30} alignItems="center" justifyContent="center">
            <Text color={customColor.brown}>No pending orders available</Text>
          </Box>
        }
        refreshControl={
          <RefreshControl
            colors={[customColor.brown, customColor.gray]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </Box>
  );
};

export default HomeScreen;
