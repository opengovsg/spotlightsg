import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react'

import { LOGIN_ROUTE } from '~constants/routes'
import AppHeader from '~components/AppHeader'
import OgpFooter from '~components/OgpFooter'

import lighthouse from '../../img/lighthouse.svg'

const Landing = (): JSX.Element => {
  return (
    <>
      <AppHeader />
      <SimpleGrid w="full" columns={2}>
        <VStack p="56px" align="start">
          <Text textStyle="display2" color="primary.400">
            Shining a spotlight on problems faced by public officers
          </Text>
          <SimpleGrid
            py="30px"
            templateColumns="100px 1fr"
            gap="10px"
            alignItems="center"
          >
            <Text textStyle="h1" color="primary.500">
              200
            </Text>
            <Text textStyle="h2">Problems Surfaced</Text>
            <Text textStyle="h1" color="primary.500">
              100
            </Text>
            <Text textStyle="h2">Replies From Other Public Officers</Text>
          </SimpleGrid>
          <Button as={Link} to={LOGIN_ROUTE} colorScheme="primary">
            Find help for your problems
          </Button>
        </VStack>
        <Box p="56px">
          <Image src={lighthouse} width="400px" />
        </Box>
      </SimpleGrid>
      <OgpFooter />
    </>
  )
}

export default Landing
