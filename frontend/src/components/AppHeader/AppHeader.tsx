import React from 'react'
import { Link } from 'react-router-dom'
import { HStack, Tag, Text } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'

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
      <HStack spacing="50px">
        <HStack as={Link} to={ROOT_ROUTE}>
          <Text textStyle="h2" color="primary.700">
            SpotlightSG
          </Text>
          <Tag background="primary.700" color="neutral.100">
            Beta
          </Tag>
        </HStack>
        <Text
          textStyle="h4"
          color="primary.700"
          as="a"
          href="https://go.gov.sg/spotlightsg-feedback"
          target="_blank"
        >
          Feedback
        </Text>
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
