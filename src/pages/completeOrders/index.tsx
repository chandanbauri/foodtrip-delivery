import {Box, FlatList, Text} from 'native-base';
import * as React from 'react';
import {Dimensions, RefreshControl} from 'react-native';
import FocusedStatusBar from '../../components/general/statusBar';
import {HomeScreenProps} from '../../navigation/tab/types';
import {useIsFocused} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import {customColor} from '../../theme';
import DeliveredOrder from '../../components/cards/delivered';
import Loader from '../../components/general/Loader';
const {height, width} = Dimensions.get('window');
const CompletedOrders = ({navigation, route}: HomeScreenProps) => {
  const [initializing, setInitializing] = React.useState<boolean>(true);
  const [list, setList] = React.useState<Array<any>>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const startInitializing = () => setInitializing(true);
  const stopInitializing = () => setInitializing(false);
  let IsFocused = useIsFocused();
  const getOrders = async () => {
    setInitializing(true);
    // setList([]);
    try {
      let res = await firebase
        .app('SECONDARY_APP')
        .firestore()
        .collection('deliveryPartners')
        .doc(auth().currentUser?.uid)
        .collection('completed')
        .get();
      if (res.size >= 1) {
        await Promise.all(
          res.docs
            .sort(function (a, b) {
              return b.data().placedAt - a.data().placedAt;
            })
            .map(async item => {
              let data = item.data();
              let index = list.findIndex(value => value.id == item.id);
              if (index == -1)
                setList(prev => {
                  return [...prev, {...data, id: item.id}];
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
        .collection('completed')
        .get();
      if (res.size >= 1) {
        await Promise.all(
          res.docs
            .sort(function (a, b) {
              return b.data().placedAt - a.data().placedAt;
            })
            .map(async item => {
              let data = item.data();
              let index = list.findIndex(value => value.id == item.id);
              if (index == -1)
                setList(prev => {
                  return [...prev, {...data, id: item.id}];
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
          <DeliveredOrder
            order={item}
            onAction={startInitializing}
            onActionComplete={stopInitializing}
          />
        )}
        ListEmptyComponent={
          <Box mt={30} alignItems="center" justifyContent="center">
            <Text color={customColor.brown}>No on going orders available</Text>
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

export default CompletedOrders;
