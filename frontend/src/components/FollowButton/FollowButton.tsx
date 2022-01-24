import React, { useState } from 'react'
import { BellIcon } from '@chakra-ui/icons'
import { Button, useToast } from '@chakra-ui/react'

import { followPost, unfollowPost } from '~services/SpotlightApi'

type FollowButtonProps = {
  isFollowingInitial: boolean
  postId: number
}

const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowingInitial,
  postId,
}) => {
  const toast = useToast()
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial)

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation() // stop postcard from clicking
    if (isFollowing) {
      try {
        await unfollowPost({ postId })
        toast({ title: 'Post unfollowed', status: 'success' })
        setIsFollowing(false)
      } catch (e) {
        toast({ title: 'Post already unfollowed', status: 'warning' })
        setIsFollowing(false)
      }
    } else {
      try {
        await followPost({ postId })
        toast({ title: 'Post followed', status: 'success' })
        setIsFollowing(true)
      } catch (e) {
        toast({ title: 'Post already following', status: 'warning' })
        setIsFollowing(true)
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
