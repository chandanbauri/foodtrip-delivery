import {
  Box,
  Button,
  Center,
  Column,
  Container,
  FlatList,
  Text,
} from 'native-base';
import * as React from 'react';
import {Dimensions} from 'react-native';
import FocusedStatusBar from '../../components/general/statusBar';
import {ProfileScreenProps} from '../../navigation/tab/types';
import {customColor} from '../../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../../contexts/auth';
import {ToggleState} from '../../utilities';
import Loader from '../../components/general/Loader';
import {useIsFocused} from '@react-navigation/core';

const {width, height} = Dimensions.get('window');
function ProfileScreen({navigation, route}: ProfileScreenProps) {
  const Auth = React.useContext(AuthContext);
  const [initializing, setInitializing] = React.useState<boolean>(false);
  const isFocused = useIsFocused();
  if (initializing) return <Loader />;
  return (
    <Container>
      <FocusedStatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      <Box w={width}>
        <Column h={height}>
          <Box
            h={height * 0.35}
            w={width}
            bg={{
              linearGradient: {
                colors: [customColor.brown, customColor.logoBg],
                start: [0, 0],
                end: [1, 0],
              },
            }}>
            <Center flex={1}>
              <Box
                h={100}
                w={100}
                rounded="full"
                borderColor="white"
                borderWidth={2}>
                <Center flex={1}>
                  <FontAwesome name="user" size={50} color="white" />
                </Center>
              </Box>
              <Text fontSize="xl" bold color="white" mt={2}>
                {Auth?.user.displayName ?? 'User name'}
              </Text>
            </Center>
          </Box>
          <Box
            flex={1}
            flexGrow={1}
            bg="white"
            px={4}
            py={5}
            shadow={5}
            roundedTopLeft={20}
            roundedTopRight={20}
            style={{transform: [{translateY: -22}]}}>
            <Text fontWeight="700" fontSize="2xl" color={customColor.brown}>
              Name
            </Text>
            <Text color={customColor.gray} ml={2} my={3}>
              {Auth?.user.displayName ?? 'User name'}
            </Text>
            <Text fontWeight="700" fontSize="2xl" color={customColor.brown}>
              Email
            </Text>
            <Text color={customColor.gray} ml={2} my={3}>
              {Auth?.user.email ?? 'Email'}
            </Text>
            <Text fontWeight="700" fontSize="2xl" color={customColor.brown}>
              Phone
            </Text>
            <Text color={customColor.gray} ml={2} my={3}>
              {Auth?.user.phoneNumber ?? 'Phone Number'}
            </Text>
            <Box>
              <Button
                mt={10}
                bgColor={`${customColor.brown}90`}
                onPress={async () => {
                  try {
                    if (isFocused) {
                      setInitializing(true);
                      let res = await ToggleState();
                      if (res && res.data) {
                        let {state} = JSON.parse(res.data);
                        console.log('CURRENT USER STATE', state);
                        if (Auth && Auth.setState)
                          Auth.setState(state ?? false);
                      }
                      setInitializing(false);
                    }
                  } catch (error) {
                    setInitializing(false);
                    throw error;
                  }
                }}>
                <Text>{!Auth?.state ? 'Go Online' : 'Go Offline'}</Text>
              </Button>
              <Button
                mt={5}
                onPress={() => {
                  Auth?.logOut();
                }}>
                <Text color={customColor.white}>Log out</Text>
              </Button>
            </Box>
          </Box>
        </Column>
      </Box>
    </Container>
  );
}

export default ProfileScreen;
