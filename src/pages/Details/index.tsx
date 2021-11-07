import {Box, Divider, FlatList, Row, Text} from 'native-base';
import * as React from 'react';
import {DetailsScreenProps} from '../../navigation/helper';
import {customColor} from '../../theme';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dimensions, Linking, Pressable} from 'react-native';
import FocusedStatusBar from '../../components/general/statusBar';
import moment from 'moment';

const {width} = Dimensions.get('window');

export default function DetailsScreen({route, navigation}: DetailsScreenProps) {
  let {order} = route.params;
  // console.log(order.createdAt);
  React.useLayoutEffect(() => {
    navigation?.setOptions({
      headerLeft: () => (
        <Pressable
          style={{paddingLeft: 10}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Feather name="chevron-left" size={24} color={customColor.brown} />
        </Pressable>
      ),
    });
  });
  const getItemCosting = (list: Array<any>) => {
    let total: number = 0;
    list.map(item => {
      total = total + parseInt(item.cost);
    });
    return total.toFixed(2);
  };
  const makeCall = () => {
    Linking.openURL(`tel:${order.userDetails.phone}`);
  };
  const FoodItem = (props: any) => (
    <Box
      my={1}
      py={2}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between">
      <Box maxWidth={width * 0.5}>
        <Text fontSize="sm" fontWeight="700" color={customColor.brown}>
          {`${props.name} (${props.count})`}
        </Text>
        <Text fontSize="xs" color={customColor.gray}>
          {props.desc}
        </Text>
      </Box>
      <Box>
        <Text fontWeight="700" color={customColor.brown}>
          {parseFloat(props.cost).toFixed(2)}
        </Text>
      </Box>
    </Box>
  );
  const ListHeader = () => (
    <>
      <Box paddingY={5} w="100%">
        <Row w="100%" justifyContent="space-between" alignItems="center">
          <Box>
            <Text fontSize="lg" fontWeight="700" color={customColor.brown}>
              {`${order.restaurantDetails.name}`}
            </Text>
            <Text fontSize="xs" mt={2} color={customColor.gray}>
              {`${order.restaurantDetails.address}`}
            </Text>
          </Box>
          <Pressable>
            <Fontisto
              name="map-marker-alt"
              size={24}
              color={customColor.brown}
            />
          </Pressable>
        </Row>
      </Box>
      <Box paddingY={5} w="100%" maxWidth={width}>
        <Box>
          <Text fontSize="lg" fontWeight="700" color={customColor.brown}>
            {`${order.userDetails.name}`}
          </Text>
          <Row justifyContent="space-between" alignItems="center" flexGrow={1}>
            <Text
              fontSize="sm"
              fontWeight="700"
              mt={2}
              color={customColor.brown}>
              {`${order.userDetails.phone}`}
            </Text>
            <Pressable style={{padding: 5}} onPress={() => makeCall()}>
              <Ionicons name="call" size={24} color={customColor.brown} />
            </Pressable>
          </Row>
          <Text fontSize="xs" mt={2} color={customColor.gray}>
            {`${order.userDetails.deliveryAddress}`}
          </Text>
          <Text fontSize="xs" mt={2} color={customColor.gray}>
            {`${
              order.placedAt
                ? moment(order.placedAt).format('DD/MM/YYYY HH:mm')
                : ''
            }`}
          </Text>
        </Box>
      </Box>
      <Box>
        <Text fontWeight="700" fontSize="xl" color={customColor.brown} mb={2}>
          Order Details
        </Text>
      </Box>
    </>
  );

  const ListFooter = () => (
    <Box mb={20} py={2} borderTopWidth={1} borderTopColor={customColor.gray}>
      <Row justifyContent="space-between">
        <Text color={customColor.brown} fontWeight="700">
          Item Total
        </Text>
        <Text color={customColor.brown} fontWeight="700">
          {`${getItemCosting(order.items)}`}
        </Text>
      </Row>
      <Row justifyContent="space-between">
        <Text color={customColor.brown} fontWeight="700">
          GST
        </Text>
        <Text color={customColor.brown} fontWeight="700">
          {`${parseFloat(order.gst).toFixed(2)}`}
        </Text>
      </Row>
      <Row justifyContent="space-between">
        <Text color={customColor.brown} fontWeight="700">
          Delivery Charge
        </Text>
        <Text color={customColor.brown} fontWeight="700">
          {`${parseFloat(order.deliveryCharge).toFixed(2)}`}
        </Text>
      </Row>
      <Row justifyContent="space-between" mb={2}>
        {/*  <Text color={customColor.brown} fontWeight="700">
          Tip
        </Text>
        <Text color={customColor.brown} fontWeight="700">
          0
        </Text> */}
      </Row>
      <Divider />
      <Row justifyContent="space-between" mt={2}>
        <Text color={customColor.brown} fontWeight="700">
          Grand total
        </Text>
        <Text color={customColor.brown} fontWeight="700">
          {`${order.amount}`}
        </Text>
      </Row>
      <Box mt={5}>
        <Text color={customColor.brown} fontWeight="700" fontSize="xl" mb={1}>
          ORDER ID
        </Text>
        <Text color={customColor.gray} textTransform="uppercase">{`#${
          order.docId ?? order.id
        }`}</Text>
        <Text
          color={customColor.brown}
          fontWeight="700"
          fontSize="xl"
          mt={2}
          mb={1}>
          Payment
        </Text>
        <Text color={customColor.gray}>{`${
          order.paymentMethod == 'RAZORPAY' ? 'ONLINE' : order.paymentMethod
        }`}</Text>
      </Box>
    </Box>
  );
  return (
    <Box bgColor={customColor.white}>
      <Box px={2}>
        <FocusedStatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent={true}
        />
        <FlatList
          data={order.items}
          ListHeaderComponent={() => <ListHeader />}
          ListFooterComponent={() => <ListFooter />}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item}) => <FoodItem {...item} />}
          ItemSeparatorComponent={() => <Divider />}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </Box>
  );
}
