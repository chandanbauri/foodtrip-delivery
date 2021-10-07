import {Box, Text} from 'native-base';
import * as React from 'react';
import {ActivityIndicator, Dimensions, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {flexGrow} from 'styled-system';
import NotificationCard from '../../components/cards/Notification';
import FocusedStatusBar from '../../components/general/statusBar';
import {useIsFocused} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import {customColor} from '../../theme';
const {height, width} = Dimensions.get('window');
function NotificationScreen() {
  let data = Array.apply(null, Array(8)).map(
    (item, index: number) => `item ${index}`,
  );
  const [initializing, setInitializing] = React.useState<boolean>(true);
  const [list, setList] = React.useState<Array<any>>([]);
  let IsFocused = useIsFocused();
  const getOrders = async () => {
    setInitializing(true);
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
  // const saveFCMToken = async () => {
  //   if (IsFocused) {
  //     try {
  //       let res = await addFCMtoke({FCM: await getFCMToken()});
  //       console.log(res);
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  //   return;
  // };
  React.useEffect(() => {
    if (IsFocused) {
      getOrders().catch(error => {
        throw error;
      });
    }
    return;
  }, [IsFocused]);

  // React.useEffect(() => {
  //   saveFCMToken().catch(error => {
  //     throw error;
  //   });
  //   return;
  // }, []);
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
    <>
      <SafeAreaView />
      <FocusedStatusBar
        backgroundColor={customColor.white}
        barStyle="dark-content"
        translucent={true}
      />
      <FlatList
        style={{backgroundColor: customColor.white}}
        ListHeaderComponent={
          <Box
            width={width}
            px={5}
            py={3}
            justifyContent="center"
            bgColor="white">
            <Text fontSize="3xl" color="gray.800">
              Notifications
            </Text>
          </Box>
        }
        data={list}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}) => <NotificationCard {...item} />}
        stickyHeaderIndices={[0]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Box mt={10} px={5} justifyContent="center">
            <Text color={customColor.brown}>No requests available for now</Text>
          </Box>
        }
      />
      {/* </Box> */}
    </>
  );
}

export default NotificationScreen;
