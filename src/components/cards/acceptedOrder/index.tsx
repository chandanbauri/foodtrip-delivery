import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Box, Button, Divider, Row, Text} from 'native-base';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CombinedNavigationProp} from '../../../navigation';
import {DetailsScreenProps} from '../../../navigation/helper';
import {customColor} from '../../../theme';

const AcceptOrderCard: React.FunctionComponent = () => {
  const [isPickedUp, setIsPickedUp] = React.useState<boolean>(false);
  const [isDelivered, setIsDelivered] = React.useState<boolean>(false);
  const navigation = useNavigation<CombinedNavigationProp>();
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
        <Row justifyContent="space-between" alignItems="center">
          <Button
            px={10}
            py={3}
            bg={customColor.brown}
            shadow={2}
            onPress={() => {
              navigation.navigate('Details');
            }}>
            <Text fontSize="xs" color="white">
              View Details
            </Text>
          </Button>
          {isPickedUp ? (
            isDelivered ? (
              <Button px={10} py={3} bg="gray.300">
                <Text fontSize="xs" color="gray.800">
                  Delivered
                </Text>
              </Button>
            ) : (
              <Button px={10} py={3} bg="fuchsia.500" shadow={2}>
                <Text
                  fontSize="xs"
                  color="white"
                  onPress={() => {
                    navigation.navigate('Delivery');
                  }}>
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
              onPress={() => {
                setIsPickedUp(() => true);
              }}>
              <Text fontSize="xs" color="white">
                Pick up
              </Text>
            </Button>
          )}
        </Row>
      </Box>
    </Box>
  );
};

export default AcceptOrderCard;
