import './components'
import * as page from './pages/index'
import Router from './core/router'
import AuthController from './controllers/auth-controller'
import { RegistrationPage } from './pages/registration'

enum Routes {
  Index = '/',
  Register = '/signup',
  Profile = '/profile',
  Settings = '/settings',
  Home = '/home',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.Index, page.LoginPage).use(Routes.Profile, page.Profile).use(Routes.Register, RegistrationPage)

  let isProtectedRoute = true

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false
      break
  }

  try {
    await AuthController.fetchUser()

    Router.start()

    if (!isProtectedRoute) {
      Router.go(Routes.Profile)
    }
  } catch (e) {
    console.log(e, 'Here')
    Router.start()

    if (isProtectedRoute) {
      Router.go(Routes.Index)
    }
  }
})
