import { UserEmailDomain } from 'auth/types'
import { CommentWithUser } from 'comments/types'
import { PostAttributes } from 'database/models'

export type PostStripped = Omit<PostAttributes, 'userId'>

export type PostWithShortDetails = PostStripped & {
  commentsCount: number
  user: UserEmailDomain
  canManage: boolean
}

export type PostWithLongDetails = PostStripped & {
  comments: CommentWithUser[]
  user: UserEmailDomain
  canManage: boolean
}
