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

type Post = {
  id: number
  issue: string
  actionsTaken: string
}

export type GetAllPostsResponse = Post[]
export type CreatePostResponse = Post
