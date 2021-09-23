import {useNavigation} from '@react-navigation/native';
import {Box, Button, Divider, Row, Text} from 'native-base';
import * as React from 'react';
import {Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../../contexts/auth';
import {CombinedNavigationProp} from '../../../navigation';
import {customColor} from '../../../theme';
import {acceptOrder, rejectOrder} from '../../../utilities';
import firebase from '@react-native-firebase/app';

const OrderCard: React.FunctionComponent<any> = (props: any) => {
  const {onChange, onAcction, onActionComplete, ...data} = props;
  const Auth = React.useContext(AuthContext);
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
              {props.restaurantDetails.name.slice(0, 20)}
            </Text>
            <Text color="gray.400" fontSize="sm" mt={2} maxWidth={200}>
              {props.restaurantDetails.address.slice(0, 20)}
            </Text>
          </Box>
        </Row>
        <Box w="100%" mt={4}>
          <Row justifyContent="space-around" alignItems="center">
            <Button
              px={5}
              py={3}
              bg={customColor.brown}
              shadow={2}
              onPress={() => {
                navigation.navigate('home', {
                  screen: 'Details',
                  params: {
                    order: data,
                  },
                });
              }}>
              <Text fontSize="xs" color="white">
                View Details
              </Text>
            </Button>
            <Button
              px={5}
              py={3}
              bg="green.400"
              onPress={async () => {
                try {
                  if (props.onAction) props.onAction();
                  let res = await acceptOrder({
                    orderId: props.docId,
                    user: {
                      name: Auth?.user.displayName,
                      email: Auth?.user.email,
                      phone: Auth?.user.phoneNumber,
                    },
                    reqId: props.reqId,
                  });
                  let parsed = JSON.parse(res.data);
                  // console.log(parsed);
                  if (props.onAction) props.onActionComplete();
                  if (parsed.succees) {
                    Alert.alert(
                      'Order Accepted',
                      'The order is accepted successfully',
                      [
                        {
                          text: 'OK',
                          onPress: () => {
                            navigation.navigate('active');
                          },
                        },
                      ],
                    );
                  } else {
                    Alert.alert(
                      'Cannot accept order at the moment',
                      'The order is probably not availabe',
                      [
                        {
                          text: 'OK',
                          onPress: () => {},
                        },
                      ],
                    );
                  }
                } catch (error) {
                  if (props.onAction) props.onActionComplete();
                  Alert.alert(
                    'There is some issue',
                    'Please try again after some time',
                    [
                      {
                        text: 'OK',
                        onPress: () => {},
                      },
                    ],
                  );
                  throw error;
                }
              }}>
              <Text fontSize="xs" color="white">
                Accept
              </Text>
            </Button>
            <Button
              px={5}
              py={3}
              bg="red.500"
              onPress={async () => {
                try {
                  if (props.onAction) props.onAction();
                  let res = await rejectOrder({
                    orderId: props.docId,
                    reqId: props.reqId,
                  });
                  if (res) {
                    if (props.onAction) props.onActionComplete();
                    // console.log(JSON.parse(res.data));
                    // onChange();
                    Alert.alert('The Request is Rejected', '');
                  }
                } catch (error) {
                  if (props.onAction) props.onActionComplete();
                  throw error;
                }
              }}>
              <Text fontSize="xs" color="white">
                Reject
              </Text>
            </Button>
          </Row>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderCard;
