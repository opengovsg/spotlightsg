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

export type GetAllPostsResponse = {
  id: number
  issue: string
  actionsTaken: string
}[]
