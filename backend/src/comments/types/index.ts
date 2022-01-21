import { UserEmailDomain } from 'auth/types'
import { Comment } from '../../database/models'

export type CommentWithUser = Omit<Comment, 'postId' | 'userId'> & {
  user: UserEmailDomain
}
