import * as React from 'react';
import {
  Box,
  Center,
  useTheme,
  Container,
  Flex,
  Input,
  Text,
  Column,
  Button,
} from 'native-base';
import {SiginScreenProps} from '../../../navigation/root/types';
import FocusedStatusBar from '../../../components/general/statusBar';
import {TextInputProps} from 'react-native';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
function CustomInputField(props: TextInputProps) {
  return <Input w="100%" mt={5} {...props} rounded={30} />;
}

function SignInScreen({navigation, route}: SiginScreenProps) {
  const {colors} = useTheme();
  return (
    <>
      <FocusedStatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      <Center flex={1} w={width} bg="emerald.500">
        <Container w="100%">
          <Text fontSize="4xl" color="white">
            Sign in
          </Text>
          <Flex direction="column" mt={10} w="100%">
            <Column alignItems="flex-start">
              <Text color="white">Email</Text>
              <CustomInputField
                placeholder="Enter Email"
                placeholderTextColor="white"
              />
            </Column>
            <Column alignItems="flex-start" mt={5}>
              <Text color="white">Password</Text>
              <CustomInputField
                placeholder="Enter password"
                placeholderTextColor="white"
              />
            </Column>
            <Button color="emerald.400" mt={10} bg="white" rounded={30}>
              Sign in
            </Button>
          </Flex>
        </Container>
      </Center>
    </>
  );
}

export default SignInScreen;
