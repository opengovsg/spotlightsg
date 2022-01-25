import React, { useState } from 'react'
import { Box, Button, Textarea, VStack } from '@chakra-ui/react'

import { createComment } from '~services/SpotlightApi'

type NewCommentProps = {
  postId: number | undefined
  commentAddedCallback: () => void
}

const NewComment: React.FC<NewCommentProps> = ({
  postId,
  commentAddedCallback,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState('')
  const onSubmit = async () => {
    if (!postId) return
    setIsLoading(true)
    await createComment({ postId, content })
    setContent('')
    setIsLoading(false)
    commentAddedCallback()
  }
  return (
    <form
      onSubmit={(e) => {
        // Prevent default which reloads the page
        e.preventDefault()
        onSubmit()
      }}
    >
      <VStack align="stretch" spacing="10px">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your reply here..."
          required
        />
        <Box textAlign="end">
          <Button
            type="submit"
            variant="link"
            isLoading={isLoading}
            colorScheme="primary"
          >
            Add Comment
          </Button>
        </Box>
      </VStack>
    </form>
  )
}

export default NewComment
