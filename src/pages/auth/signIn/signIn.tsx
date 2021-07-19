import * as React from 'react';
import {
  Box,
  Center,
  Container,
  Flex,
  Input,
  Text,
  Column,
  Button,
  AspectRatio,
  Image,
  Row,
} from 'native-base';
import {SiginScreenProps} from '../../../navigation/root/types';
import FocusedStatusBar from '../../../components/general/statusBar';
import {TextInputProps} from 'react-native';
import {Dimensions} from 'react-native';
import {customColor} from '../../../theme';
import {color} from 'styled-system';

const {width} = Dimensions.get('window');
function CustomInputField(props: TextInputProps) {
  return (
    <Input
      w="100%"
      mt={5}
      {...props}
      rounded={30}
      borderColor={customColor.brown}
      borderWidth={2}
      color={customColor.brown}
    />
  );
}

function SignInScreen({navigation, route}: SiginScreenProps) {
  return (
    <>
      <FocusedStatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      <Center flex={1} w={width} bg={customColor.logoBg}>
        <Container w="100%">
          <Column
            reversed
            w="100%"
            alignItems="flex-start"
            justifyContent="space-between">
            <Text fontSize="4xl" color={customColor.brown}>
              Sign in
            </Text>
            <AspectRatio width="40%">
              <Image
                size="lg"
                resizeMode="cover"
                source={require('../../../assets/general/logo.png')}
                alt="Food adda logo"
              />
            </AspectRatio>
          </Column>
          <Flex direction="column" mt={10} w="100%" justifyContent="flex-start">
            <Column alignItems="flex-start">
              <Text color={customColor.brown} bold>
                Email
              </Text>
              <CustomInputField
                placeholder="Enter Email"
                placeholderTextColor={customColor.brown}
              />
            </Column>
            <Column alignItems="flex-start" mt={5}>
              <Text color={customColor.brown} bold>
                Password
              </Text>
              <CustomInputField
                placeholder="Enter password"
                placeholderTextColor={customColor.brown}
              />
            </Column>
            <Button
              mt={10}
              bg="purple.400"
              rounded={30}
              onPress={() => {
                navigation.navigate('TabNav', {
                  screen: 'home',
                });
              }}>
              <Text bold fontSize={20} color="white">
                Sign in
              </Text>
            </Button>
          </Flex>
        </Container>
      </Center>
    </>
  );
}

export default SignInScreen;
