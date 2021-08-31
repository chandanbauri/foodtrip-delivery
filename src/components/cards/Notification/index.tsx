import {useNavigation} from '@react-navigation/native';
import {Box, Center, Row, Text} from 'native-base';
import * as React from 'react';
import {Dimensions, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CombinedNavigationProp} from '../../../navigation';

const NotificationCard = (props: any) => {
  const navigation = useNavigation<CombinedNavigationProp>();
  // console.log(props);s
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('home', {
          screen: 'Details',
          params: {
            order: props,
          },
        });
      }}>
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
            <Box flexDirection="row">
              <Text fontSize="xs">{`Order No. :`}</Text>
              <Text
                fontSize="xs"
                textTransform="uppercase">{`#${props.docId}`}</Text>
            </Box>
            <Text fontSize="xs">
              {`${props.restaurantDetails.address}`.slice(0, 30)}
            </Text>
          </Box>
        </Row>
      </Box>
    </Pressable>
  );
};

export default NotificationCard;
