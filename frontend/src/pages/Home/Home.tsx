import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Flex, Input, SimpleGrid, Text, VStack } from '@chakra-ui/react'

import { BROWSE_ROUTE } from '~constants/routes'
import AppHeader from '~components/AppHeader'
import PostCard from '~components/PostCard'

const Landing = (): JSX.Element => {
  return (
    <>
      <AppHeader />
      <VStack p="50px" align="stretch">
        <Flex justify="space-between" align="flex-start">
          <Text textStyle="display1" color="primary.400">
            Have a problem?
          </Text>
          <Button as={Link} to={BROWSE_ROUTE} colorScheme="primary">
            Browse Submitted Problems
          </Button>
        </Flex>
        <VStack align="start" pt="50px">
          <Text>How would you describe your issue with a few keywords?</Text>
          <Input />
        </VStack>
        <SimpleGrid columns={2} spacing="30px" pt="50px">
          <PostCard id="a" route="/home/posts/a" />
          <PostCard id="b" route="/home/posts/b" />
          <PostCard id="c" route="/home/posts/c" />
          <PostCard id="d" route="/home/posts/d" />
          <PostCard id="e" route="/home/posts/e" />
        </SimpleGrid>
      </VStack>
    </>
  )
}

export default Landing
