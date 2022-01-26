import React from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'

import CommentComponent from '~/components/Comment'

import { Comment } from '~services/types'
import NewComment from '~components/NewComment'

type CommentsSectionProps = {
  postId: number
  comments: Comment[]
  onRefresh: () => void
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  postId,
  comments,
  onRefresh,
}) => {
  return (
    <Box>
      <Text textStyle="h4" color="primary.600">
        Comments
      </Text>
      <VStack spacing="10px" align="stretch">
        {comments.length ? (
          comments.map((comment) => (
            <CommentComponent
              key={comment.id}
              content={comment.content}
              email={comment.user.emailDomain}
              createdAt={comment.createdAt}
            />
          ))
        ) : (
          <Text>No Comments Found</Text>
        )}
      </VStack>
      <Box mt="20px">
        <NewComment postId={postId} commentAddedCallback={onRefresh} />
      </Box>
    </Box>
  )
}

export default CommentsSection
