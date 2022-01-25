import React, { useState } from 'react'
import { TriangleUpIcon } from '@chakra-ui/icons'
import { Button, Text, VStack } from '@chakra-ui/react'
import _ from 'lodash'

type VoteButtonProps = {
  isVotedInitial: boolean
  voteCountInitial: number
}

const VoteButton: React.FC<VoteButtonProps> = ({
  isVotedInitial,
  voteCountInitial,
}) => {
  const [isVoted, setIsVoted] = useState(isVotedInitial)

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    setIsVoted(!isVoted)
  }

  const voteCount =
    voteCountInitial + (isVoted ? 1 : 0) - (isVotedInitial ? 1 : 0)
  return (
    <Button
      borderRadius="8px"
      background="primary.100"
      py="5px"
      px="20px"
      onClick={onClick}
    >
      <VStack>
        <TriangleUpIcon color={isVoted ? 'primary.700' : 'gray.300'} />
        <Text fontWeight="bold" color="primary.700">
          {voteCount}
        </Text>
      </VStack>
    </Button>
  )
}

export default VoteButton
