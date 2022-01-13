import { AxiosResponse } from 'axios'

import baseConfig from './baseConfig'
import { MessageResponse, VerifyOtpByEmailResponse } from './types'

export function requestOtpByEmail({
  email,
}: {
  email: string
}): Promise<AxiosResponse<MessageResponse>> {
  return baseConfig.post<MessageResponse>('/auth', {
    email,
  })
}

export function veryfyOtpByEmail(params: {
  email: string
  token: string
}): Promise<AxiosResponse<VerifyOtpByEmailResponse>> {
  return baseConfig.post<VerifyOtpByEmailResponse>('/auth/verify', params)
}
