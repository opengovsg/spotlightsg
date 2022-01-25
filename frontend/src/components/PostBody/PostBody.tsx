import React from 'react'
import { useHistory } from 'react-router-dom'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'

import { HOMEPAGE_ROUTE } from '~constants/routes'
import { deletePost } from '~services/SpotlightApi'
import DeletePostAlert from '~components/DeletePostAlert'
import FollowButton from '~components/FollowButton'
import VoteButton from '~components/VoteButton'

type PostBodyProps = {
  postId: number
  title: string
  issue: string
  actionsTaken: string
  canManage: boolean
  isFollowing: boolean
  onEditClick: () => void
}

const PostBody: React.FC<PostBodyProps> = ({
  postId,
  title,
  issue,
  actionsTaken,
  canManage,
  isFollowing,
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
      await deletePost({ id: postId })
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
        <VoteButton isVotedInitial={false} voteCountInitial={0} />
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
        <FollowButton isFollowingInitial={isFollowing} postId={postId} />
      </HStack>
    </VStack>
  )
}

export default PostBody
