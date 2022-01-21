import React from 'react'
import { BellIcon } from '@chakra-ui/icons'
import { Button, useToast } from '@chakra-ui/react'

import { followPost, unfollowPost } from '~services/SpotlightApi'

type FollowButtonProps = {
  isFollowing: boolean
  postId: number
}

const FollowButton: React.FC<FollowButtonProps> = ({ isFollowing, postId }) => {
  const toast = useToast()
  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation() // stop postcard from clicking
    if (isFollowing) {
      try {
        await unfollowPost({ postId })
        toast({ title: 'Post unfollowed', status: 'success' })
      } catch (e) {
        toast({ title: 'Post already unfollowed', status: 'warning' })
      }
    } else {
      try {
        await followPost({ postId })
        toast({ title: 'Post followed', status: 'success' })
      } catch (e) {
        toast({ title: 'Post already following', status: 'warning' })
      }
    }
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
