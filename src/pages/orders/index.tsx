import {Box, Button, Center, FlatList, Text} from 'native-base';
import * as React from 'react';
import {ActivityIndicator, Dimensions, RefreshControl} from 'react-native';
import AcceptOrderCard from '../../components/cards/acceptedOrder';
import FocusedStatusBar from '../../components/general/statusBar';
import {HomeScreenProps} from '../../navigation/tab/types';
import {useIsFocused} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import {customColor} from '../../theme';
import Loader from '../../components/general/Loader';
import {AuthContext} from '../../contexts/auth';
import {ToggleState} from '../../utilities';
const {height, width} = Dimensions.get('window');
const OrderScreen = ({navigation, route}: HomeScreenProps) => {
  const [initializing, setInitializing] = React.useState<boolean>(true);
  const [list, setList] = React.useState<Array<any>>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const startInitializing = () => setInitializing(true);
  const stopInitializing = () => setInitializing(false);
  let IsFocused = useIsFocused();
  const Auth = React.useContext(AuthContext);
  const getOrders = async () => {
    setInitializing(true);
    // setList([]);
    try {
      let res = await firebase
        .app('SECONDARY_APP')
        .firestore()
        .collection('deliveryPartners')
        .doc(auth().currentUser?.uid)
        .collection('ongoing')
        .get();
      if (res.size >= 1) {
        await Promise.all(
          res.docs
            .sort(function (a, b) {
              return b.data().placedAt - a.data().placedAt;
            })
            .map(async item => {
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
        .collection('ongoing')
        .get();
      if (res.size >= 1) {
        await Promise.all(
          res.docs
            .sort(function (a, b) {
              return b.data().placedAt - a.data().placedAt;
            })
            .map(async item => {
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
      setInitializing(false);
    } catch (error) {
      throw error;
    }
  }, [refreshing]);
  React.useEffect(() => {
    if (IsFocused) {
      getOrders().catch(error => {
        throw error;
      });
    }
    return;
  }, [IsFocused]);
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
            <AcceptOrderCard
              order={item}
              onAction={startInitializing}
              onActionComplete={stopInitializing}
              refresh={onRefresh}
            />
          )}
          ListEmptyComponent={
            <Box mt={30} alignItems="center" justifyContent="center">
              <Text color={customColor.brown}>
                No on going orders available
              </Text>
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
                setInitializing(true);
                let res = await ToggleState();
                if (res && res.data) {
                  let {state} = JSON.parse(res.data);
                  if (Auth && Auth.setState) Auth.setState(state);
                }
                setInitializing(false);
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

export default OrderScreen;
