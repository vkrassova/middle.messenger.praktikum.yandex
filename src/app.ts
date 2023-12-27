import './components'
import * as page from './pages/index'
import Router from './core/router'
import AuthController from './controllers/auth-controller'
import { Routes } from './utils/constants'

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.Index, page.LoginPage)
    .use(Routes.Profile, page.Profile)
    .use(Routes.Register, page.RegistrationPage)
    .use(Routes.Home, page.HomePage)
    .use(Routes.Error, page.ErrorPage)
    .use(Routes.ProfileEdit, page.ProfileEditPage)
    .use(Routes.PasswordEdit, page.EditPasswordPage)

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
      Router.go(Routes.Home)
    }
  } catch (e) {
    Router.start()

    if (isProtectedRoute) {
      Router.go(Routes.Index)
    }
  }
})
