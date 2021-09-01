import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Box, Button, Divider, Row, Text} from 'native-base';
import * as React from 'react';
import {Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CombinedNavigationProp} from '../../../navigation';
import {DetailsScreenProps} from '../../../navigation/helper';
import {customColor} from '../../../theme';
import {onPickUp, updateOrder} from '../../../utilities';

const AcceptOrderCard: React.FunctionComponent = (props: any) => {
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
              {props.restaurantDetails.name}
            </Text>
            <Text color="gray.400" fontSize="sm" mt={2} maxWidth={200}>
              {props.restaurantDetails.address}
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
                    order: props,
                  },
                });
              }}>
              <Text fontSize="xs" color="white">
                View Details
              </Text>
            </Button>
            {props.isPickedUp ? (
              props.isDelivered ? (
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
                      params: {order: props},
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
                    let res = await onPickUp({
                      user: props.useDetails,
                      orderId: props.docId,
                      activeId: props.reqId,
                    });
                    // props.onChange();
                    // console.log(res);
                  } catch (error) {
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
