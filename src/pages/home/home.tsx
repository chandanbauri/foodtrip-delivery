import {Box, Button, Center, FlatList, Spinner, Text} from 'native-base';
import * as React from 'react';
import {ActivityIndicator, Dimensions, RefreshControl} from 'react-native';

import OrderCard from '../../components/cards/Order';
import FocusedStatusBar from '../../components/general/statusBar';
import {HomeScreenProps} from '../../navigation/tab/types';
import {customColor} from '../../theme';
import {
  addFCMtoke,
  fetchRequests,
  getFCMToken,
  getState,
  test,
  ToggleState,
} from '../../utilities';
import {useIsFocused} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import {requestNotificationPermission} from '../../utilities/permissions/permissions';
import Loader from '../../components/general/Loader';
import {AuthContext} from '../../contexts/auth';

const {height, width} = Dimensions.get('window');
const HomeScreen = ({navigation, route}: HomeScreenProps) => {
  const [initializing, setInitializing] = React.useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [list, setList] = React.useState<Array<any>>([]);
  const startInitializing = () => setInitializing(true);
  const stopInitializing = () => {
    setInitializing(false);
  };
  const Auth = React.useContext(AuthContext);
  const IsFocused = useIsFocused();
  const getOrders = async () => {
    setInitializing(true);
    // setList([]);
    try {
      let res = await firebase
        .app('SECONDARY_APP')
        .firestore()
        .collection('deliveryPartners')
        .doc(auth().currentUser?.uid)
        .collection('requests')
        .get();
      if (res && res.size >= 1) {
        Promise.all(
          res.docs.map(async (item: any) => {
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
          }),
        );
      }
      stopInitializing();
    } catch (error) {
      stopInitializing();
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
        Promise.all(
          res.docs.map(async item => {
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
          }),
        );
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
  const getUserState = async () => {
    try {
      let state = await getState(auth().currentUser?.uid);
      Auth?.setState(state);
      // console.log('USER IS', state ? 'ONLINE' : 'OFFLINE');
    } catch (error) {
      console.error(error);
    }
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
  React.useEffect(() => {
    getUserState().catch(error => console.error(error));
  }, []);
  if (initializing) return <Loader />;
  if (Auth && Auth.state)
    return (
      <Box width={width}>
        <FocusedStatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent={true}
        />
        <FlatList
          data={list}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item}) => (
            <OrderCard
              {...item}
              onAction={startInitializing}
              onActionComplete={stopInitializing}
            />
          )}
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
  else
    return (
      <>
        <FocusedStatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent={true}
        />
        <Center flex={1}>
          <Text color={customColor.brown} fontSize="md">
            To View Content Go Online
          </Text>
          <Button
            bgColor={customColor.brown}
            mt={2}
            onPress={async () => {
              try {
                let res = await ToggleState();
                if (res && res.data) {
                  let {state} = JSON.parse(res.data);
                  if (Auth && Auth.setState) Auth.setState(state);
                }
              } catch (error) {
                throw error;
              }
            }}>
            <Text color="white">Go Online</Text>
          </Button>
        </Center>
      </>
    );
};

export default HomeScreen;
