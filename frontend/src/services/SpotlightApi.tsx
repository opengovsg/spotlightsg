import { AxiosResponse } from 'axios'

import baseConfig from './baseConfig'
import { OtpResponse } from './types'

export function requestOtpByEmail({
  email,
}: {
  email: string
}): Promise<AxiosResponse<OtpResponse>> {
  return baseConfig.post<OtpResponse>('/auth', {
    email,
  })
}
