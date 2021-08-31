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

const {width, height} = Dimensions.get('window');
function ProfileScreen({navigation, route}: ProfileScreenProps) {
  const Auth = React.useContext(AuthContext);
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
                Chandan Bauri
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
              Chandan Bauri
            </Text>
            <Text fontWeight="700" fontSize="2xl" color={customColor.brown}>
              Email
            </Text>
            <Text color={customColor.gray} ml={2} my={3}>
              email@example.com
            </Text>
            <Text fontWeight="700" fontSize="2xl" color={customColor.brown}>
              Phone
            </Text>
            <Text color={customColor.gray} ml={2} my={3}>
              +91 9876543210
            </Text>
            <Button
              onPress={() => {
                Auth?.logOut();
              }}>
              <Text>Log out</Text>
            </Button>
          </Box>
        </Column>
      </Box>
    </Container>
  );
}

export default ProfileScreen;
