import { UserEmailDomain } from 'auth/types'
import { CommentWithUser } from 'comments/types'
import { User, PostAttributes } from 'database/models'

export type PostStripped = Omit<PostAttributes, 'userId' | 'comments' | 'user'>

export type PostStrippedWithCommentsCount = PostStripped & {
  commentsCount: number
}

export type PostStrippedWithCommentsCountAndOriginalUser =
  PostStrippedWithCommentsCount & {
    user: User
  }

export type PostStrippedWithCommentsCountAndUserEmailDomainAndAccess =
  PostStrippedWithCommentsCount & {
    user: UserEmailDomain
    canManage: boolean
  }

export type PostStrippedWithUserEmailDomainAndCommentAndAccess =
  PostStripped & {
    user: UserEmailDomain
    comments: CommentWithUser[]
    canManage: boolean
  }
