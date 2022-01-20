import { UserEmailDomain } from 'auth/types'

export type CommentWithUser = {
  id: number
  user: UserEmailDomain
  content: string
  createdAt: Date
  updatedAt: Date
}
