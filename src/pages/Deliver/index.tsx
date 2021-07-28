import {Box, Button, Checkbox, Column, Pressable, Row, Text} from 'native-base';
import * as React from 'react';
import {DeliveryScreenProps} from '../../navigation/helper';
import {customColor} from '../../theme';
import Feather from 'react-native-vector-icons/Feather';
import FocusedStatusBar from '../../components/general/statusBar';

function DeliveryScreen({route, navigation}: DeliveryScreenProps) {
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
        <Text color={customColor.gray}># sdknfjknlasnldsajb</Text>
      </Box>
      <Box mt={3}>
        <Text fontWeight="700" fontSize="2xl" color={customColor.brown}>
          Date
        </Text>
        <Text color={customColor.gray}>{`he`}</Text>
      </Box>
      <Box mt={3}>
        <Text fontWeight="700" fontSize="2xl" color={customColor.brown}>
          Delivered To
        </Text>
        <Text color={customColor.gray}>
          Road 5, Dishergarh, Asansol, Paschim Burdwan
        </Text>
      </Box>
      <Column mt={3} alignItems="flex-start">
        <Checkbox value="true" my={2} accessibilityLabel="Acknowledgement">
          <Text color={customColor.brown} ml={3} fontWeight="700">
            Payment Received
          </Text>
        </Checkbox>
      </Column>
      <Row justifyContent="space-between" alignItems="center" px={5} mt={10}>
        <Button
          px={10}
          py={3}
          bg={customColor.brown}
          shadow={2}
          onPress={() => {}}>
          <Text fontSize="xs" color="white">
            Delivered
          </Text>
        </Button>

        <Button
          px={10}
          py={3}
          bg={customColor.brown}
          shadow={2}
          onPress={() => {}}>
          <Text fontSize="xs" color="white">
            Cancel
          </Text>
        </Button>
      </Row>
    </Box>
  );
}

export default DeliveryScreen;
