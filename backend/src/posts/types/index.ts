import { UserEmailDomain } from 'auth/types'
import { CommentWithUser } from 'comments/types'
import { User } from 'database/models'

export type PostStripped = {
  id: number
  issue: string
  actionsTaken: string
  createdAt: Date
  updatedAt: Date
}

export type PostStrippedWithCommentsCount = PostStripped & {
  commentsCount: number
}

export type PostStrippedWithCommentsCountAndOriginalUser =
  PostStrippedWithCommentsCount & {
    user: User
  }

export type PostStrippedWithCommentsCountAndUserEmailDomain =
  PostStrippedWithCommentsCount & {
    user: UserEmailDomain
  }

export type PostStrippedWithUserEmailDomainAndComment = PostStripped & {
  user: UserEmailDomain
  comments: CommentWithUser[]
}
