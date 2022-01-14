import React from 'react'
import { Link } from 'react-router-dom'
import { Button, HStack, Text } from '@chakra-ui/react'

import { useAuth } from '~/auth'

import { ROOT_ROUTE } from '~constants/routes'

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
      <Text as={Link} to={ROOT_ROUTE}>
        Spotlight logo here
      </Text>
      <HStack align="center" spacing="16px" paddingRight="16px">
        <Text textStyle="subhead1" color="neutral.700">
          {auth?.user.email}
        </Text>
        <Button variant="outline" onClick={onLogout}>
          Logout
        </Button>
      </HStack>
    </HStack>
  )
}

export default AppHeader
