import React from 'react'
import { useHistory } from 'react-router-dom'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  HStack,
  Spacer,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'

import { HOMEPAGE_ROUTE } from '~constants/routes'
import { deletePost } from '~services/SpotlightApi'
import { Post } from '~services/types'
import DeletePostAlert from '~components/DeletePostAlert'
import FollowButton from '~components/FollowButton'
import VoteButton from '~components/VoteButton'

type PostBodyProps = {
  post: Post
  onEditClick: () => void
}

const PostBody: React.FC<PostBodyProps> = ({
  post: {
    id,
    title,
    issue,
    actionsTaken,
    canManage,
    isFollowing,
    upvoteCount,
    hasBeenUpvoted,
  },
  onEditClick,
}) => {
  const toast = useToast()
  const history = useHistory()

  const {
    isOpen: deleteIsOpen,
    onClose: deleteOnClose,
    onOpen: deleteOnOpen,
  } = useDisclosure()

  const onDelete = async () => {
    try {
      await deletePost({ id })
      toast({ title: `Post ${title} deleted`, status: 'info' })
      history.push(HOMEPAGE_ROUTE)
    } catch (error) {
      toast({ title: String(error), status: 'error' })
    }
  }

  return (
    <VStack spacing="10px" align="stretch">
      <Flex justify="space-between" align="start">
        <Box>
          <Text textStyle="h2" color="primary.600">
            {title}
          </Text>
        </Box>
        <VoteButton
          postId={id}
          isVotedInitial={hasBeenUpvoted}
          voteCountInitial={upvoteCount}
        />
      </Flex>
      <Box>
        <Text textStyle="h4" color="primary.600">
          Issue
        </Text>
        <Box whiteSpace="pre-line">{issue}</Box>
      </Box>
      <Box>
        <Text textStyle="h4" color="primary.600">
          Actions Taken
        </Text>
        <Box whiteSpace="pre-line">{actionsTaken}</Box>
      </Box>
      <HStack spacing="10px">
        <Spacer />
        {canManage && (
          <Button
            leftIcon={<EditIcon />}
            size="sm"
            onClick={onEditClick}
            variant="outline"
          >
            Edit
          </Button>
        )}
        {canManage && (
          <Button
            leftIcon={<DeleteIcon />}
            size="sm"
            onClick={deleteOnOpen}
            variant="outline"
          >
            <DeletePostAlert
              onClose={deleteOnClose}
              isOpen={deleteIsOpen}
              onDelete={onDelete}
            />
            Delete
          </Button>
        )}
        <FollowButton isFollowingInitial={isFollowing} postId={id} />
      </HStack>
    </VStack>
  )
}

export default PostBody
