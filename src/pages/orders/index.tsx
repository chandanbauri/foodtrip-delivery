import {Box, FlatList} from 'native-base';
import * as React from 'react';
import {Dimensions} from 'react-native';
import AcceptOrderCard from '../../components/cards/acceptedOrder';
import FocusedStatusBar from '../../components/general/statusBar';
import {HomeScreenProps} from '../../navigation/tab/types';

const {height, width} = Dimensions.get('window');
const OrderScreen = ({navigation, route}: HomeScreenProps) => {
  const data = Array.apply(null, Array(10)).map(
    (item, index) => `item ${index}`,
  );
  const data1 = Array.apply(null, Array(10)).map(
    (item, index) => `item ${index + 11}`,
  );
  return (
    <Box width={width}>
      <FocusedStatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      {/* <Container w={width} h={height * 0.1}>
          <Flex w={width} justifyContent="center" alignItems="center">
            <Text bold fontSize="2xl" color={customColor.brown}>
              Orders
            </Text>
          </Flex>
        </Container> */}
      <FlatList
        data={data}
        keyExtractor={item => item}
        renderItem={() => <AcceptOrderCard />}
      />
    </Box>
  );
};

export default OrderScreen;
