import { Icon, HStack,IconButton } from '@chakra-ui/react';
import { RiNotificationLine, RiUserAddLine, RiCloseCircleLine } from 'react-icons/ri';
import { useContext, useEffect } from "react"
import { AuthContext } from "../../../contexts/AuthContext";
export function NotificationNav(): JSX.Element {
  const { user, signOut } = useContext(AuthContext);

  function onOpen(){
    signOut()
  }
  
  return (
    <HStack
      spacing={['6', '8']}
      mx={['6', '8']}
      pr={['6', '8']}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <Icon as={RiNotificationLine} fontSize="20" />

      <Icon as={RiUserAddLine} fontSize="20" />

      <IconButton
          aria-label="Sair"
          icon={<Icon as={RiCloseCircleLine} />}
          fontSize="20"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        />
    </HStack>
  );
}
