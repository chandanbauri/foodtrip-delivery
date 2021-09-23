import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Box, Button, Divider, Row, Text} from 'native-base';
import * as React from 'react';
import {Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CombinedNavigationProp} from '../../../navigation';
import {DetailsScreenProps} from '../../../navigation/helper';
import {customColor} from '../../../theme';
import {onPickUp, updateOrder} from '../../../utilities';

const AcceptOrderCard = (props: any) => {
  const {order} = props;
  const navigation = useNavigation<CombinedNavigationProp>();
  return (
    <Box width="100%" flexGrow={1} rounded={20} my={3} px={4}>
      <Box width="100%" bgColor="white" shadow={2} px={6} py={5} rounded={20}>
        <Row alignItems="center">
          <Box p={2}>
            <Ionicons name="fast-food" size={30} color={customColor.brown} />
          </Box>
          <Divider orientation="vertical" bgColor={customColor.brown} />
          <Box ml={6}>
            <Text bold fontSize="lg" color="gray.500">
              {order.restaurantDetails.name.slice(0, 20)}
            </Text>
            <Text color="gray.400" fontSize="sm" mt={2} maxWidth={200}>
              {order.restaurantDetails.address.slice(0, 20)}
            </Text>
          </Box>
        </Row>
        <Box w="100%" mt={4}>
          <Row justifyContent="space-between" alignItems="center">
            <Button
              px={10}
              py={3}
              bg={customColor.brown}
              shadow={2}
              onPress={() => {
                navigation.navigate('home', {
                  screen: 'Details',
                  params: {
                    order: order,
                  },
                });
              }}>
              <Text fontSize="xs" color="white">
                View Details
              </Text>
            </Button>
            {order.isPickedUp ? (
              order.isDelivered ? (
                <Button px={10} py={3} bg="gray.300">
                  <Text fontSize="xs" color="gray.800">
                    Delivered
                  </Text>
                </Button>
              ) : (
                <Button
                  px={10}
                  py={3}
                  bg="fuchsia.500"
                  shadow={2}
                  onPress={() => {
                    navigation.navigate('home', {
                      screen: 'Delivery',
                      params: {order: order},
                    });
                  }}>
                  <Text fontSize="xs" color="white">
                    Delivered
                  </Text>
                </Button>
              )
            ) : (
              <Button
                px={10}
                py={3}
                bg={customColor.brown}
                shadow={2}
                onPress={async () => {
                  // updateOrder({state: {isPickedUp, orderId: props.id}});
                  // setIsPickedUp(() => true);
                  try {
                    if (props.onAction) props.onAction();
                    let res = await onPickUp({
                      user: order.useDetails,
                      orderId: order.docId,
                      activeId: order.reqId,
                    });
                    if (res) {
                      if (props.onActionComplete) props.onActionComplete();
                      Alert.alert(
                        'Order Picked up',
                        'order picked up completed',
                        [
                          {
                            text: 'ok',
                            onPress: () => {
                              if (props.refresh) {
                                props.refresh();
                              }
                            },
                          },
                        ],
                      );
                    }
                    // props.onChange();
                    // console.log(res);
                  } catch (error) {
                    if (props.onActionComplete) props.onActionComplete();
                    Alert.alert('Opps !!', 'Some thing went wrong', [
                      {
                        text: 'Ok',
                        onPress: () => {},
                      },
                    ]);
                    throw error;
                  }
                }}>
                <Text fontSize="xs" color="white">
                  Pick up
                </Text>
              </Button>
            )}
          </Row>
        </Box>
      </Box>
    </Box>
  );
};

export default AcceptOrderCard;
