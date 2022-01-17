import React from 'react'
import { Box, Button, Textarea, VStack } from '@chakra-ui/react'

const NewComment: React.FC = () => {
  const onSubmit = () => {
    console.log('submitted')
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
        <Textarea></Textarea>
        <Box>
          <Button type="submit">Reply</Button>
        </Box>
      </VStack>
    </form>
  )
}

export default NewComment
