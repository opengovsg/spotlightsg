import axios from 'axios'

import { Auth } from '~/auth/types'
import { LOGGED_IN_KEY } from '~/localStorage'

const BACKEND_URL = 'http://localhost:8080/api'

const baseConfiguration = {
  // Configure base url
  baseURL: BACKEND_URL,
}
// Helper to load user and read the token and craft the Auth Header
export function getAuthorizationHeader(): { Authorization: string } {
  // const user = Storage.loadUser()
  const s = window.localStorage.getItem(LOGGED_IN_KEY)
  const auth: Auth | null = s ? JSON.parse(s) : null
  const accessToken = auth?.token
  return { Authorization: `Bearer ${accessToken}` }
}

// Create the api service which operational needs calls
const ApiService = axios.create(baseConfiguration)

export default ApiService
