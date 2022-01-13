import { Redirect, Route, RouteProps } from 'react-router-dom'

import { useAuth } from '~/auth'

import { LOGIN_ROUTE } from '~constants/routes'

export const PrivateRoute = ({
  children,
  ...rest
}: Omit<RouteProps, 'render'>): JSX.Element => {
  const { auth } = useAuth()

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: LOGIN_ROUTE,
              state: { from: location },
            }}
          />
        )
      }}
    />
  )
}
