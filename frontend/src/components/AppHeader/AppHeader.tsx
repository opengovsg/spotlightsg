import React from 'react'
import { Link } from 'react-router-dom'
import { Badge, Button, HStack, Text } from '@chakra-ui/react'

import { useAuth } from '~/auth'

import { LOGIN_ROUTE, ROOT_ROUTE } from '~constants/routes'

const AppHeader: React.FC = () => {
  const { auth, setAuth } = useAuth()

  const onLogout = () => {
    setAuth(null)
  }

  return (
    <HStack
      padding="20px 32px"
      background="white"
      borderBottomWidth="1px"
      borderColor="neutral.300"
      borderStyle="solid"
      justify="space-between"
      align="center"
    >
      <HStack as={Link} to={ROOT_ROUTE}>
        <Text textStyle="h2" color="primary.700">
          SpotlightSG
        </Text>
        <Badge background="primary.700" color="neutral.100">
          Beta
        </Badge>
      </HStack>
      <HStack align="center" spacing="16px" paddingRight="16px">
        <Text textStyle="subhead1" color="neutral.700">
          {auth?.user.email}
        </Text>
        {auth && (
          <Button onClick={onLogout} colorScheme="primary">
            Logout
          </Button>
        )}
        {!auth && (
          <Button as={Link} to={LOGIN_ROUTE} colorScheme="primary">
            Login
          </Button>
        )}
      </HStack>
    </HStack>
  )
}

export default AppHeader
