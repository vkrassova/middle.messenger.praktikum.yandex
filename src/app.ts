import './components'
import * as page from './pages/index'
import Router from './core/router'
import exitIcon from './img/exit-icon.svg'
import smileIcon from './img/smile.svg'
import AuthController from './controllers/auth-controller'
import { Profile } from './pages/profile'

const login = new page.LoginPage()
const home = new page.HomePage()
const profile = new Profile({ icon: exitIcon, avatarIcon: smileIcon, name: 'Имя' })
const settings = new page.ProfileSettingsPage({ icon: exitIcon, avatarIcon: smileIcon })
const registration = new page.RegistrationPage({ title: 'Регистрация' })
// const error505 = new page.ErrorPage({ description: 'We are already fixing', error: '505' })
// const error404 = new page.ErrorPage({ description: 'The page you are looking for can’t be found', error: '404' })
const navigation = new page.NavigationPage()

enum Routes {
  Index = '/',
  Register = '/signup',
  Profile = '/profile',
  Settings = '/settings',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.Index, login)
    .use(Routes.Profile, profile)
    .use(Routes.Settings, settings)
    .use(Routes.Register, registration)

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
