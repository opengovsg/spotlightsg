import React, { useEffect, useState } from 'react'
import { DeleteIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

import { useAuth } from '~/auth'

import { getPostWithComments } from '~services/SpotlightApi'
import { GetPostWithCommentResponse } from '~services/types'
import Comment from '~components/Comment'
import NewComment from '~components/NewComment'
import PostBody from '~components/PostBody'

type PostProps = {
  id: number | undefined
}

const Post: React.FC<PostProps> = ({ id }) => {
  const { auth } = useAuth()
  const {
    isOpen: deleteIsOpen,
    onClose: deleteOnClose,
    onOpen: deleteOnOpen,
  } = useDisclosure()
  const deleteCancelRef = React.useRef<HTMLButtonElement>(null)

  // hack: change this variable to trigger a refetch
  const [toRefetch, setToRefetch] = useState(0)

  const [postWithComments, setPostWithComments] = useState<
    GetPostWithCommentResponse | undefined
  >()

  const refreshPost = async (id: number | undefined) => {
    if (!id) {
      return
    }
    setPostWithComments(undefined)
    const postWithComments = await getPostWithComments({ id })
    setPostWithComments(postWithComments)
  }
  useEffect(() => {
    refreshPost(id)
  }, [id, toRefetch])

  const comments = postWithComments?.comments || []
  return (
    <Box position="relative">
      {postWithComments ? (
        <>
          {auth?.user.email === postWithComments.user.email && (
            <>
              <Menu>
                <MenuButton
                  top="0"
                  right="0"
                  position="absolute"
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  variant="ghost"
                  size="lg"
                />
                <MenuList>
                  <MenuItem icon={<EditIcon />}>Edit</MenuItem>
                  <MenuItem icon={<DeleteIcon />} onClick={deleteOnOpen}>
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
              <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={deleteCancelRef}
                onClose={deleteOnClose}
                isOpen={deleteIsOpen}
                isCentered
              >
                <AlertDialogOverlay />

                <AlertDialogContent>
                  <AlertDialogHeader color="black">
                    Delete post?
                  </AlertDialogHeader>
                  <AlertDialogCloseButton />
                  <AlertDialogBody>
                    Are you sure you want to delete the post permanently?
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={deleteCancelRef} onClick={deleteOnClose}>
                      No
                    </Button>
                    <Button colorScheme="red" ml={3}>
                      Yes
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
          <PostBody
            email={postWithComments.user.email}
            issue={postWithComments.issue}
            actionsTaken={postWithComments.actionsTaken}
          />
          <Box mt="30px">
            <Text textStyle="h4" color="primary.500">
              Comments
            </Text>
            <VStack spacing="10px" align="stretch">
              {comments.length ? (
                comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    content={comment.content}
                    email={postWithComments.user.email}
                  />
                ))
              ) : (
                <Text>No Comments Found</Text>
              )}
            </VStack>
          </Box>
        </>
      ) : (
        <Spinner />
      )}
      <Box mt="30px">
        <Text textStyle="h4" color="primary.500">
          Add your reply
        </Text>
        <NewComment
          postId={id}
          commentAddedCallback={() => setToRefetch(toRefetch + 1)}
        />
      </Box>
    </Box>
  )
}

export default Post
