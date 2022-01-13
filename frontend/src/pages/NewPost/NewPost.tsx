import { Container, Text, VStack } from '@chakra-ui/react'

import AppHeader from '~components/AppHeader'

const NewPost = (): JSX.Element => {
  return (
    <>
      <AppHeader />
      <Container>
        <VStack align="start" py="30px">
          <Text>New Post</Text>
        </VStack>
      </Container>
    </>
  )
}

export default NewPost
