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
  Popover,
} from 'native-base';
import {SiginScreenProps} from '../../../navigation/root/types';
import FocusedStatusBar from '../../../components/general/statusBar';
import {TextInputProps} from 'react-native';
import {Dimensions} from 'react-native';
import {customColor} from '../../../theme';
import {color} from 'styled-system';
import {AuthContext} from '../../../contexts/auth';

type fieldTypes = {
  email: string;
  password: string;
};

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
  const Auth = React.useContext(AuthContext);
  const [fields, setFields] = React.useState<fieldTypes>({
    email: '',
    password: '',
  });
  const [isPopOverOpen, setPopOverOpen] = React.useState<boolean>(false);
  const ErrorMsg = React.useRef<string>('');
  const handleTextInput = (fieldName: string, text: string) =>
    setFields((prev: any) => ({...prev, [fieldName]: text}));
  const onSubmit = async () => {
    try {
      if (fields.email !== '' && fields.password !== '')
        Auth?.login(fields?.email, fields?.password, (error: any) => {
          ErrorMsg.current = 'The user may have been deleted';
          setPopOverOpen(true);
        });
      else {
        ErrorMsg.current = 'Please Provide a valid email and password';
        setPopOverOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
                source={require('../../../assets/icon/logo.jpeg')}
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
                onChangeText={text => handleTextInput('email', text)}
                keyboardType="email-address"
              />
            </Column>
            <Column alignItems="flex-start" mt={5}>
              <Text color={customColor.brown} bold>
                Password
              </Text>
              <CustomInputField
                placeholder="Enter password"
                placeholderTextColor={customColor.brown}
                secureTextEntry={true}
                onChangeText={text => handleTextInput('password', text)}
              />
            </Column>
            {/* <Button
              mt={10}
              bg="purple.400"
              rounded={30}
              onPress={() => {
                // navigation.navigate('TabNav', {
                //   screen: 'home',
                // });
                onSubmit();
              }}>
              <Text bold fontSize={20} color="white">
                Sign in
              </Text>
            </Button> */}
            <Popover // @ts-ignore
              placement="bottom"
              isOpen={isPopOverOpen}
              onClose={() => {
                setPopOverOpen(false);
              }}
              trigger={triggerProps => {
                return (
                  <Button
                    alignSelf="center"
                    {...triggerProps}
                    mt={10}
                    bg="purple.400"
                    rounded={30}
                    w="100%"
                    onPress={() => {
                      onSubmit();
                    }}>
                    <Text bold fontSize={20} color="white">
                      Sign in
                    </Text>
                  </Button>
                );
              }}>
              <Popover.Content>
                <Popover.Arrow />
                <Popover.CloseButton />
                <Popover.Header>
                  <Text bold fontSize={20} color="red.500">
                    Error
                  </Text>
                </Popover.Header>
                <Popover.Body>{ErrorMsg.current}</Popover.Body>
              </Popover.Content>
            </Popover>
          </Flex>
        </Container>
      </Center>
    </>
  );
}

export default SignInScreen;
