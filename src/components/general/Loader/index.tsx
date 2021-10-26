import {Box, Center, Heading, HStack, Spinner} from 'native-base';
import * as React from 'react';
import FocusedStatusBar from '../statusBar';

export default function Loader() {
  return (
    <>
      <FocusedStatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      <Center flex={1}>
        <HStack space={2}>
          <Spinner accessibilityLabel="Loading posts" />
        </HStack>
      </Center>
    </>
  );
}
