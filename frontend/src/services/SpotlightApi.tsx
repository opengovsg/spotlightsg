import baseConfig, { getAuthorizationHeader } from './baseConfig'
import {
  GetAllPostsResponse,
  MessageResponse,
  VerifyOtpByEmailResponse,
} from './types'

export function requestOtpByEmail({
  email,
}: {
  email: string
}): Promise<MessageResponse> {
  return baseConfig
    .post<MessageResponse>('/auth', {
      email,
    })
    .then((res) => res.data)
}

export function veryfyOtpByEmail(params: {
  email: string
  token: string
}): Promise<VerifyOtpByEmailResponse> {
  return baseConfig
    .post<VerifyOtpByEmailResponse>('/auth/verify', params)
    .then((res) => res.data)
}

export function getAllPosts(): Promise<GetAllPostsResponse> {
  const headers = getAuthorizationHeader()
  return baseConfig
    .get<GetAllPostsResponse>('posts', { headers })
    .then((res) => res.data)
}
