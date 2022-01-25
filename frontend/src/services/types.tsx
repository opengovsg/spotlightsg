export type MessageResponse = {
  message: string
}

export type VerifyOtpByEmailResponse = {
  user: {
    id: number
    email: string
  }
  token: string
}

type UserAnon = {
  emailDomain: string
}

export type Post = {
  id: number
  title: string
  issue: string
  actionsTaken: string
  createdAt: string
  user: UserAnon
  canManage: boolean
  isFollowing: boolean
  followsCount: number
}

export type Comment = {
  id: number
  content: string
  user: UserAnon
}

export type PostWithCommentsCount = Post & { commentsCount: number }

export type GetAllPostsResponse = PostWithCommentsCount[]
export type CreatePostResponse = Post

export type GetPostWithCommentResponse = Post & {
  comments: Comment[]
}
