import { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
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

import { BROWSE_ROUTE, NEW_POST_ROUTE } from '~constants/routes'
import AppHeader from '~components/AppHeader'
import Post from '~components/Post'
import PostCard from '~components/PostCard'
import PostModal from '~components/PostModal'

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
              as={Link}
              to={NEW_POST_ROUTE}
            >
              New Post
            </Button>
          </HStack>
          <VStack align="stretch" w="full">
            <PostCard id="a" route="/browse/posts/a" />
            <PostCard id="b" route="/browse/posts/b" />
            <PostCard id="c" route="/browse/posts/c" />
          </VStack>
        </VStack>
      </Container>
    </>
  )
}

export default Browse
