import './components'
import * as page from './pages/index'
import router from './core/router'
import exitIcon from './img/exit-icon.svg'
import smileIcon from './img/smile.svg'

const login = new page.LoginPage()
const home = new page.HomePage()
const profile = new page.ProfilePage({ icon: exitIcon, avatarIcon: smileIcon, name: 'Имя' })
const settings = new page.ProfileSettingsPage({ icon: exitIcon, avatarIcon: smileIcon })
const registration = new page.RegistrationPage({ title: 'Регистрация' })
const error505 = new page.ErrorPage({ description: 'We are already fixing', error: '505' })
const error404 = new page.ErrorPage({ description: 'The page you are looking for can’t be found', error: '404' })
const navigation = new page.NavigationPage()

enum Routes {
  Index = '/',
  Register = '/signup',
  Profile = '/profile',
  Login = '/login',
  Settings = '/settings',
}

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.Profile, profile)
    .use(Routes.Index, navigation)
    .use(Routes.Settings, settings)
    .use(Routes.Login, login)
    .start()
})
