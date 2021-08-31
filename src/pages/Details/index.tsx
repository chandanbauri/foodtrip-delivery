import {
  Box,
  Button,
  Divider,
  FlatList,
  Row,
  Text,
  ScrollView,
} from 'native-base';
import * as React from 'react';
import {DetailsScreenProps} from '../../navigation/helper';
import {customColor} from '../../theme';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Pressable} from 'react-native';
import FocusedStatusBar from '../../components/general/statusBar';

export default function DetailsScreen({route, navigation}: DetailsScreenProps) {
  const info = React.useRef<any>();
  let {order} = route.params;
  console.log(order);
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

  let data = Array.apply(null, Array<string>(5)).map(
    (item, index: number) => `item-${index}`,
  );
  const FoodItem = (props: any) => (
    <Box my={1} px={2} py={2}>
      <Text fontSize="xl" fontWeight="700" color={customColor.brown}>
        {props.name}
      </Text>
      <Text fontSize="xs" color={customColor.gray}>
        {props.desc}
      </Text>
    </Box>
  );
  const ListHeader = () => (
    <>
      <Box paddingY={5} w="100%">
        <Row w="100%" justifyContent="space-between" alignItems="center">
          <Box>
            <Text fontSize="2xl" fontWeight="700" color={customColor.brown}>
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
      <Box paddingY={5} w="100%">
        <Row w="100%" justifyContent="space-between" alignItems="center">
          <Box>
            <Text fontSize="2xl" fontWeight="700" color={customColor.brown}>
              {`${order.userDetails.name}`}
            </Text>
            <Text fontSize="xs" mt={2} color={customColor.gray}>
              {`${order.userDetails.deliveryAddress}`}
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
      <Box>
        <Text fontWeight="700" fontSize="2xl" color={customColor.brown} mb={2}>
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
          {`${order.amount}`}
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
        <Text
          color={customColor.gray}
          textTransform="uppercase">{`#${order.docId}`}</Text>
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
