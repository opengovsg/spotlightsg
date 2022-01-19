import React, { useEffect, useState } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
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
  HStack,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

import { useAuth } from '~/auth'
import { prettifyEmail } from '~/helpers'

import { getPostWithComments } from '~services/SpotlightApi'
import { GetPostWithCommentResponse } from '~services/types'
import Comment from '~components/Comment'
import EditPostBody from '~components/EditPostBody'
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

  const [isEditing, setIsEditing] = useState(false)

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
          <Text fontWeight="bold">
            {prettifyEmail(postWithComments.user.email)}
          </Text>
          {auth?.user.email === postWithComments.user.email && (
            <>
              <HStack pt="20px">
                <Button
                  leftIcon={<EditIcon />}
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  disabled={isEditing}
                >
                  Edit
                </Button>
                <Button
                  leftIcon={<DeleteIcon />}
                  size="sm"
                  onClick={deleteOnOpen}
                >
                  Delete
                </Button>
              </HStack>
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
          {isEditing ? (
            <EditPostBody
              defaultIssue={postWithComments.issue}
              defaultActionsTaken={postWithComments.actionsTaken}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              <PostBody
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
            </>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </Box>
  )
}

export default Post
