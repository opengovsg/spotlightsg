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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'

import { NEW_POST_ROUTE, ROOT_ROUTE } from '~constants/routes'
import AppHeader from '~components/AppHeader'
import Post from '~components/Post'
import PostCard from '~components/PostCard'

const Dashboard = (): JSX.Element => {
  const history = useHistory()
  const params = useParams<{ postId: string | undefined }>()
  const [isPostOpen, setIsPostOpen] = useState<boolean>(!!params.postId)

  useEffect(() => {
    setIsPostOpen(!!params.postId)
  }, [params])

  const onClosePost = () => {
    history.push(ROOT_ROUTE)
  }

  return (
    <>
      <AppHeader />
      <Container>
        <Modal isOpen={isPostOpen} onClose={onClosePost}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Post />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="primary" mr={3} onClick={onClosePost}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
            <PostCard id="a" />
            <PostCard id="b" />
            <PostCard id="c" />
          </VStack>
        </VStack>
      </Container>
    </>
  )
}

export default Dashboard
