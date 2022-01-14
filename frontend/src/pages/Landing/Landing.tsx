import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react'

import { LOGIN_ROUTE } from '~constants/routes'
import AppHeader from '~components/AppHeader'

const Landing = (): JSX.Element => {
  return (
    <>
      <AppHeader />
      <SimpleGrid w="full" columns={2}>
        <VStack pl="56px" pt="56px" align="start">
          <Text textStyle="display2" color="primary.400">
            Shining a spotlight on problems faced by public officers
          </Text>
          <VStack pt="30px" align="start">
            <HStack>
              <Text textStyle="h3" color="primary.500">
                200
              </Text>
              <Text textStyle="h4">Problems Surfaced</Text>
            </HStack>
            <HStack>
              <Text textStyle="h3" color="primary.500">
                100
              </Text>
              <Text textStyle="h4">Replies From Other Public Officers</Text>
            </HStack>
            <HStack>
              <Text textStyle="h3" color="primary.500">
                20
              </Text>
              <Text textStyle="h4">Problems Resolved</Text>
            </HStack>
          </VStack>
          <Button as={Link} to={LOGIN_ROUTE} colorScheme="primary">
            Find help for your problems
          </Button>
        </VStack>
        <Box p="56px">Lighthouse here</Box>
      </SimpleGrid>
    </>
  )
}

export default Landing
