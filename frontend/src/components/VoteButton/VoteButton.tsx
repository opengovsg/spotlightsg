import React, { useState } from 'react'
import { TriangleUpIcon } from '@chakra-ui/icons'
import { Text, Tooltip, VStack } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'

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
    <Tooltip
      label="Upvote if you're facing the same challenge"
      hasArrow
      placement="top"
    >
      <Button
        borderRadius="8px"
        background="primary.100"
        _hover={{
          background: 'primary.200',
        }}
        _active={{
          background: 'primary.200',
        }}
        onClick={onClick}
        variant="clear"
      >
        <VStack spacing="0">
          <TriangleUpIcon color={isVoted ? 'primary.700' : 'gray.300'} />
          <Text fontWeight="bold" color="primary.700">
            {voteCount}
          </Text>
        </VStack>
      </Button>
    </Tooltip>
  )
}

export default VoteButton
