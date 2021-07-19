import {Box, Button, Divider, Row, Text} from 'native-base';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {customColor} from '../../../theme';

const OrderCard: React.FunctionComponent = props => {
  return (
    <Box
      width="100%"
      flexGrow={1}
      px={10}
      py={5}
      shadow={2}
      rounded={20}
      bgColor="white"
      my={3}>
      <Row alignItems="center">
        <Box p={2}>
          <Ionicons name="fast-food" size={30} color={customColor.brown} />
        </Box>
        <Divider orientation="vertical" bgColor={customColor.brown} />
        <Box ml={6}>
          <Text bold fontSize="lg" color="gray.500">
            Title
          </Text>
          <Text color="gray.400" fontSize="sm" mt={2} maxWidth={200}>
            Road 5 Dishergarh , Asansol , Burdwan 713333
          </Text>
        </Box>
      </Row>
      <Box w="100%" mt={4}>
        <Row justifyContent="space-around" alignItems="center">
          <Button px={10} py={3} bg="green.400">
            <Text fontSize="md" color="white">
              Accept
            </Text>
          </Button>
          <Button px={10} py={3} bg="red.500">
            <Text fontSize="md" color="white">
              Reject
            </Text>
          </Button>
        </Row>
      </Box>
    </Box>
  );
};

export default OrderCard;
