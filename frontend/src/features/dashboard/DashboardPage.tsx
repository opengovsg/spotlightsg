import { Link } from 'react-router-dom'
import { Button, ButtonGroup, Flex } from '@chakra-ui/react'

import { useAuth } from '~features/auth'

const DashboardPage = (): JSX.Element => {
  const { auth, setAuth } = useAuth()

  const logout = () => {
    setAuth(null)
  }

  return (
    <Flex flexDir="column">
      YOU ARE NOW AUTHENTICATED as {auth?.user.email}. Replace this page with
      the root page of your application.
      <ButtonGroup>
        <Button onClick={logout}>Logout</Button>
        <Button>
          <Link to="/login">
            Attempt to go to login page (and see nothing happen)
          </Link>
        </Button>
      </ButtonGroup>
    </Flex>
  )
}

// Required to be default due to using dynamic import for lazy loading.
export default DashboardPage
