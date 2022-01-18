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

export type Post = {
  id: number
  issue: string
  actionsTaken: string
  createdAt: string
  user: {
    email: string
  }
}

type Comment = {
  id: number
  content: string
}

export type GetAllPostsResponse = Post[]
export type CreatePostResponse = Post

export type GetPostWithCommentResponse = Post & {
  comments: Comment[]
}
