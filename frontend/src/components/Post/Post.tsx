import React, { useEffect, useState } from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'

import { getPostWithComments } from '~services/SpotlightApi'
import { GetPostWithCommentResponse } from '~services/types'
import Comment from '~components/Comment'
import NewComment from '~components/NewComment'

type PostProps = {
  id: number | undefined
}

const Post: React.FC<PostProps> = ({ id }) => {
  const [postWithComments, setPostWithComments] = useState<
    GetPostWithCommentResponse | undefined
  >()

  const refreshPost = async (id: number | undefined) => {
    if (!id) {
      setPostWithComments(undefined)
      return
    }
    const postWithComments = await getPostWithComments({ id })
    setPostWithComments(postWithComments)
  }
  useEffect(() => {
    refreshPost(id)
  }, [id])
  return (
    <Box>
      <Box whiteSpace="pre-line">{postWithComments?.post.issue}</Box>
      <Box mt="30px">
        <Text textStyle="h4">Comments</Text>
        <VStack spacing="10px" align="stretch">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </VStack>
      </Box>
      <Box mt="30px">
        <Text textStyle="h4">Add your reply</Text>
        <NewComment />
      </Box>
    </Box>
  )
}

export default Post
