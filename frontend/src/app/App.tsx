import { BrowserRouter } from 'react-router-dom'
import { extendTheme } from '@chakra-ui/react'
import {
  theme as ogpTheme,
  ThemeProvider,
} from '@opengovsg/design-system-react'

import { AuthProvider } from '~/auth'
import override from '~/styles/override'

import { AppRouter } from './AppRouter'

export const App = (): JSX.Element => (
  <ThemeProvider theme={extendTheme(override, ogpTheme)}>
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
)
