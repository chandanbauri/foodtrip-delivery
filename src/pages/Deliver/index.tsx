import {Box, Button, Checkbox, Column, Pressable, Row, Text} from 'native-base';
import * as React from 'react';
import {DeliveryScreenProps} from '../../navigation/helper';
import {customColor} from '../../theme';
import Feather from 'react-native-vector-icons/Feather';
import FocusedStatusBar from '../../components/general/statusBar';
import {onDeliveryComplete} from '../../utilities';
import {ActivityIndicator, Alert} from 'react-native';
import Loader from '../../components/general/Loader';

function DeliveryScreen({route, navigation}: DeliveryScreenProps) {
  const {order} = route.params;
  const [paymentRecived, serPaymentRecieved] = React.useState<boolean>(false);
  // console.log(order);
  const [initializing, setInitializing] = React.useState<boolean>(false);
  let date = new Date();
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
  if (initializing) return <Loader />;
  return (
    <Box px={3}>
      <FocusedStatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      <Box mt={3}>
        <Text fontWeight="700" fontSize="2xl" color={customColor.brown}>
          Order Id
        </Text>
        <Text color={customColor.gray}>{`#${order.docId}`}</Text>
      </Box>
      {/* <Box mt={3}>
        <Text fontWeight="700" fontSize="2xl" color={customColor.brown}>
          Date
        </Text>
        <Text color={customColor.gray}>{`he`}</Text>
      </Box> */}
      <Box mt={3}>
        <Text fontWeight="700" fontSize="2xl" color={customColor.brown}>
          Delivered To
        </Text>
        <Text color={customColor.gray}>
          {`${order.userDetails.deliveryAddress}`}
        </Text>
      </Box>
      {order.paymentMethod == 'COD' && (
        <Column mt={3} alignItems="flex-start">
          <Checkbox
            value={paymentRecived ? 'true' : 'false'}
            my={2}
            accessibilityLabel="Acknowledgement"
            onChange={() => {
              serPaymentRecieved(prev => !prev);
            }}>
            <Text color={customColor.brown} ml={3} fontWeight="700">
              Payment Received
            </Text>
          </Checkbox>
        </Column>
      )}
      <Row justifyContent="space-between" alignItems="center" px={5} mt={10}>
        <Button
          px={10}
          py={3}
          bg={customColor.brown}
          shadow={2}
          onPress={async () => {
            if (paymentRecived || order.paymentMethod == 'RAZORPAY') {
              try {
                setInitializing(true);
                let res = await onDeliveryComplete({
                  orderId: order.docId,
                  activeId: order.reqId,
                });
                let response = JSON.parse(res.data);
                // console.log(response);
                if (response.succees) {
                  setInitializing(false);
                  Alert.alert(
                    'Hurray !!!',
                    'You Have Successfully Delivered Happiness',
                    [
                      {
                        text: 'SURE !',
                        onPress: () => {
                          navigation.goBack();
                        },
                      },
                    ],
                  );
                }
              } catch (error) {
                setInitializing(false);
                throw error;
              }
            } else {
              Alert.alert(
                'Opps !!',
                'Please recieve the payment and then try again',
                [
                  {
                    text: 'OK',
                    onPress: () => {},
                  },
                ],
              );
            }
          }}>
          <Text fontSize="xs" color="white">
            Delivered
          </Text>
        </Button>

        <Button
          px={10}
          py={3}
          bg={customColor.brown}
          shadow={2}
          onPress={() => {
            navigation?.goBack();
          }}>
          <Text fontSize="xs" color="white">
            go back
          </Text>
        </Button>
      </Row>
    </Box>
  );
}

export default DeliveryScreen;
