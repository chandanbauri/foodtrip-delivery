import {Box, Center, Row, Text} from 'native-base';
import * as React from 'react';
import {Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NotificationCard = () => {
  return (
    <Box w="100%" px={2} py={2} my={2} height={100} bg="white">
      <Row flex={1} alignItems="center">
        <Box height={60} width={60} bg="gray.200" rounded={80}>
          <Center flex={1}>
            <Ionicons name="mail-open" size={30} color="#BBB" />
          </Center>
        </Box>
        <Box ml={5}>
          <Text bold fontSize="md">
            Assigned To you
          </Text>
          <Text fontSize="xs">Order No. : #1252323237</Text>
          <Text fontSize="xs">
            {`Road no. 5, Dishergarh Purulia Road , Asansol`.slice(0, 30)}
          </Text>
        </Box>
      </Row>
    </Box>
  );
};

export default NotificationCard;
