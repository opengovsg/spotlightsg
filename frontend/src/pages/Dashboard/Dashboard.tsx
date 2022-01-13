import { Link } from 'react-router-dom'
import { Button, ButtonGroup, Container, Flex } from '@chakra-ui/react'

import { useAuth } from '~/auth'

import AppHeader from '~components/AppHeader'

const DashboardPage = (): JSX.Element => {
  const { auth, setAuth } = useAuth()

  const logout = () => {
    setAuth(null)
  }

  return (
    <>
      <AppHeader />
      <Container>
        <Flex flexDir="column">
          YOU ARE NOW AUTHENTICATED as {auth?.user.email}. Replace this page
          with the root page of your application.
          <ButtonGroup>
            <Button onClick={logout}>Logout</Button>
            <Button>
              <Link to="/login">
                Attempt to go to login page (and see nothing happen)
              </Link>
            </Button>
          </ButtonGroup>
        </Flex>
      </Container>
    </>
  )
}

// Required to be default due to using dynamic import for lazy loading.
export default DashboardPage
