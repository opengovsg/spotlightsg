import { Route, Switch } from 'react-router-dom'

import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  NEW_POST_ROUTE,
  POST_ROUTE,
  ROOT_ROUTE,
} from '~constants/routes'

import Dashboard from '~pages/Dashboard'
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
      <PrivateRoute exact path={DASHBOARD_ROUTE}>
        <Dashboard />
      </PrivateRoute>
      <PrivateRoute path={`${POST_ROUTE}/:postId`}>
        <Dashboard />
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
