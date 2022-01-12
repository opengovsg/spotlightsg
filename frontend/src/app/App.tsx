import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import { AuthProvider } from '~/features/auth'
import override from '~/styles/override'

import { AppRouter } from './AppRouter'

export const App = (): JSX.Element => (
  <ChakraProvider theme={extendTheme(override)}>
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </ChakraProvider>
)
