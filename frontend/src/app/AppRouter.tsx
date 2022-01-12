import { Route, Switch } from 'react-router-dom'

import DashboardPage from '~/features/dashboard/DashboardPage'
import Login from '~/routes/Login/'

import { LOGIN_ROUTE, ROOT_ROUTE } from '~constants/routes'

import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = (): JSX.Element => {
  return (
    <Switch>
      <PublicRoute exact path={LOGIN_ROUTE}>
        <Login />
      </PublicRoute>
      <PrivateRoute exact path={ROOT_ROUTE}>
        <DashboardPage />
      </PrivateRoute>
      <Route path="*">
        <div>404</div>
      </Route>
    </Switch>
  )
}
