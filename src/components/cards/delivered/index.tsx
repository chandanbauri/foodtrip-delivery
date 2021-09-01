import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Box, Button, Divider, Row, Text} from 'native-base';
import * as React from 'react';
import {Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CombinedNavigationProp} from '../../../navigation';
import {DetailsScreenProps} from '../../../navigation/helper';
import {customColor} from '../../../theme';
import {onPickUp, updateOrder} from '../../../utilities';

const DeliveredOrder = (props: any) => {
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
              {order.restaurantDetails.name ?? 'name'}
            </Text>
            <Text color="gray.400" fontSize="sm" mt={2} maxWidth={200}>
              {order.restaurantDetails.address ?? 'address'}
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
          </Row>
        </Box>
      </Box>
    </Box>
  );
};

export default DeliveredOrder;
