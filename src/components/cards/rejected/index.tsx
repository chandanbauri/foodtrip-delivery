import {Box, Divider, Row, Text} from 'native-base';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {customColor} from '../../../theme';

const RejectedOrder: React.FunctionComponent = (props: any) => {
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
      </Box>
    </Box>
  );
};

export default RejectedOrder;
