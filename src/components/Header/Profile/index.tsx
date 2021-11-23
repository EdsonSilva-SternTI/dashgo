import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

import { IProfileProps } from './@interfaces';

import { useContext, useEffect } from "react"
import { AuthContext } from "../../../contexts/AuthContext";
export function Profile({  showProfileData = true,}: IProfileProps): JSX.Element {
  const { user, signOut } = useContext(AuthContext);
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text></Text>
          <Text color="gray.300" fontSize="medium">
          {user?.email}
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name={user?.email}
        src=""
      />
    </Flex>
  );
}
