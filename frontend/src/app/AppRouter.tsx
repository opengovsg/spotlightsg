import { Route, Switch } from 'react-router-dom'

import { LOGIN_ROUTE, ROOT_ROUTE } from '~constants/routes'

import Dashboard from '~pages/Dashboard'
import Login from '~pages/Login'

import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = (): JSX.Element => {
  return (
    <Switch>
      <PublicRoute exact path={LOGIN_ROUTE}>
        <Login />
      </PublicRoute>
      <PrivateRoute exact path={ROOT_ROUTE}>
        <Dashboard />
      </PrivateRoute>
      <Route path="*">
        <div>404</div>
      </Route>
    </Switch>
  )
}
