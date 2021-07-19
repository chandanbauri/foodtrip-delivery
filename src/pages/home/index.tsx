import {Center, Column, Container, Flex, Text} from 'native-base';
import * as React from 'react';
import {Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AcceptOrderCard from '../../components/cards/acceptedOrder';
import OrderCard from '../../components/cards/Order';
import FocusedStatusBar from '../../components/general/statusBar';
import {HomeScreenProps} from '../../navigation/tab/types';
import {customColor} from '../../theme';

const {height, width} = Dimensions.get('window');
const HomeScreen = ({navigation, route}: HomeScreenProps) => {
  return (
    <Container>
      <FocusedStatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      <SafeAreaView>
        <Container w={width} h={height * 0.1}>
          <Flex w={width} justifyContent="center" alignItems="center">
            <Text bold fontSize="2xl" color={customColor.brown}>
              Orders
            </Text>
          </Flex>
        </Container>
        <Column width={width} px={4}>
          <OrderCard />
          <AcceptOrderCard />
        </Column>
      </SafeAreaView>
    </Container>
  );
};

export default HomeScreen;
