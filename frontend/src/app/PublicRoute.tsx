import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom'
import { Location } from 'history'

import { useAuth } from '~/auth'

import { HOMEPAGE_ROUTE } from '~constants/routes'

export interface PublicRouteProps extends Omit<RouteProps, 'render'> {
  // If `strict` is true, only non-authed users can access the route.
  // i.e. signin page, where authed users accessing that page should be
  // redirected out.
  // If `strict` is false, then both authed and non-authed users can access
  // the route.
  strict?: boolean
}

export const PublicRoute = ({
  children,
  strict = true,
  ...rest
}: PublicRouteProps): JSX.Element => {
  const { auth } = useAuth()

  const { state } = useLocation<{ from: Location | undefined }>()

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !!auth && strict ? (
          <Redirect
            to={{
              pathname: state?.from?.pathname ?? HOMEPAGE_ROUTE,
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  )
}
