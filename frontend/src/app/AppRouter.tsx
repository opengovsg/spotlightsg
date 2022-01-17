import { Route, Switch } from 'react-router-dom'

import {
  BROWSE_ROUTE,
  HOMEPAGE_ROUTE,
  LOGIN_ROUTE,
  NEW_POST_ROUTE,
  POST_ROUTE,
  ROOT_ROUTE,
} from '~constants/routes'

import Browse from '~pages/Browse'
import Home from '~pages/Home'
import Landing from '~pages/Landing'
import Login from '~pages/Login'
import NewPost from '~pages/NewPost'

import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = (): JSX.Element => {
  return (
    <Switch>
      <PublicRoute exact path={ROOT_ROUTE}>
        <Landing />
      </PublicRoute>
      <PublicRoute exact path={LOGIN_ROUTE}>
        <Login />
      </PublicRoute>
      <PrivateRoute exact path={BROWSE_ROUTE}>
        <Browse />
      </PrivateRoute>
      <PrivateRoute path={`${BROWSE_ROUTE}${POST_ROUTE}/:postId`}>
        <Browse />
      </PrivateRoute>
      <PrivateRoute exact path={HOMEPAGE_ROUTE}>
        <Home />
      </PrivateRoute>
      <PrivateRoute path={`${HOMEPAGE_ROUTE}${POST_ROUTE}/:postId`}>
        <Home />
      </PrivateRoute>
      <PrivateRoute exact path={NEW_POST_ROUTE}>
        <NewPost />
      </PrivateRoute>
      <Route path="*">
        <div>404</div>
      </Route>
    </Switch>
  )
}
