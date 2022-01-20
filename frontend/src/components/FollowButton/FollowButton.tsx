import React from 'react'
import { BellIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'

type FollowButtonProps = {
  isFollowing: boolean
}

const FollowButton: React.FC<FollowButtonProps> = ({ isFollowing }) => {
  return (
    <Button leftIcon={<BellIcon />} size="sm">
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}

export default FollowButton
