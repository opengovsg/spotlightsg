import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Button,
  Container,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from '@chakra-ui/react'

import { NEW_POST_ROUTE } from '~constants/routes'
import AppHeader from '~components/AppHeader'
import Post from '~components/Post'

const Dashboard = (): JSX.Element => {
  return (
    <>
      <AppHeader />
      <Container>
        <VStack align="start" py="30px">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input type="tel" placeholder="Search..." />
          </InputGroup>
          <HStack>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="primary"
              variant="solid"
              size="sm"
              as="a"
              href={NEW_POST_ROUTE}
            >
              New Post
            </Button>
          </HStack>
          <VStack align="stretch" w="full">
            <Post />
            <Post />
            <Post />
          </VStack>
        </VStack>
      </Container>
    </>
  )
}

export default Dashboard
