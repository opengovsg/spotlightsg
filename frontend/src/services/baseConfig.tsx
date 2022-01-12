import axios from 'axios'

const BACKEND_URL = 'http://localhost:8080/api'

const baseConfiguration = {
  // Configure base url
  baseURL: BACKEND_URL,
}

// Create the api service which operational needs calls
const ApiService = axios.create(baseConfiguration)

export default ApiService
