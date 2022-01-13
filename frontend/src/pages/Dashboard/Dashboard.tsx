import { SearchIcon } from '@chakra-ui/icons'
import {
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from '@chakra-ui/react'

import AppHeader from '~components/AppHeader'
import Post from '~components/Post'

const DashboardPage = (): JSX.Element => {
  return (
    <>
      <AppHeader />
      <Container>
        <VStack flexDir="column" py="30px">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input type="tel" placeholder="Search..." />
          </InputGroup>
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

// Required to be default due to using dynamic import for lazy loading.
export default DashboardPage
