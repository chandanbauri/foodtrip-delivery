import {Box, Center, Column, Container, FlatList, Text} from 'native-base';
import * as React from 'react';
import {Dimensions} from 'react-native';
import FocusedStatusBar from '../../components/general/statusBar';
import {ProfileScreenProps} from '../../navigation/tab/types';
import {customColor} from '../../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');
function ProfileScreen({navigation, route}: ProfileScreenProps) {
  const options = Array.apply(null, Array(6)).map(
    (item, index: number) => `Item ${index}`,
  );
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
            pl={8}
            py={5}
            shadow={5}
            roundedTopLeft={20}
            roundedTopRight={20}
            style={{transform: [{translateY: -22}]}}>
            <FlatList
              data={options}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <Text
                  bold
                  fontSize="lg"
                  my={4}
                  color="gray.700">{`${item}`}</Text>
              )}
            />
          </Box>
        </Column>
      </Box>
    </Container>
  );
}

export default ProfileScreen;
