import React from 'react'
import { BellIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'

type FollowButtonProps = {
  isFollowing: boolean
  postId: number
}

const FollowButton: React.FC<FollowButtonProps> = ({ isFollowing }) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation() // stop postcard from clicking
  }

  return (
    <Button
      leftIcon={<BellIcon />}
      size="sm"
      colorScheme="primary"
      onClick={onClick}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}

export default FollowButton
