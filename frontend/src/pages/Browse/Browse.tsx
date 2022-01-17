import { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { AddIcon } from '@chakra-ui/icons'
import { Button, Container, HStack, VStack } from '@chakra-ui/react'

import { BROWSE_ROUTE, NEW_POST_ROUTE } from '~constants/routes'
import AppHeader from '~components/AppHeader'
import PostCard from '~components/PostCard'
import PostModal from '~components/PostModal'
import Search from '~components/Search'

const Browse = (): JSX.Element => {
  const history = useHistory()
  const params = useParams<{ postId: string | undefined }>()
  const [isPostOpen, setIsPostOpen] = useState<boolean>(!!params.postId)

  useEffect(() => {
    setIsPostOpen(!!params.postId)
  }, [params])

  const onClosePost = () => {
    history.push(BROWSE_ROUTE)
  }

  return (
    <>
      <AppHeader />
      <Container>
        <PostModal
          isOpen={isPostOpen}
          onClose={onClosePost}
          id={params.postId}
        />
        <VStack align="start" py="30px">
          <Search onSearch={(x) => console.log(x)} />
          <HStack>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="primary"
              variant="solid"
              size="sm"
              as={Link}
              to={NEW_POST_ROUTE}
            >
              New Post
            </Button>
          </HStack>
          <VStack align="stretch" w="full">
            <PostCard id={1} route="/browse/posts/1" previewText="aaa" />
            <PostCard id={2} route="/browse/posts/2" previewText="aaa" />
            <PostCard id={3} route="/browse/posts/3" previewText="aaa" />
          </VStack>
        </VStack>
      </Container>
    </>
  )
}

export default Browse
