import React, { useState } from 'react'
import { Button, Tooltip, useToast } from '@chakra-ui/react'

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
  // Follow/Unfollow will toggle when user clicks the follow button
  // but the actual follow data is not updated
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
    <Tooltip
      label="Follow and receive updates through email"
      hasArrow
      placement="top"
    >
      <Button
        size="sm"
        colorScheme="primary"
        variant="outline"
        onClick={onClick}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    </Tooltip>
  )
}

export default FollowButton
