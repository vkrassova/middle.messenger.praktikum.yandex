import './components'

import * as page from './pages/index'
import { render } from './core/render-DOM'

import exitIcon from './img/exit-icon.svg'
import smileIcon from './img/smile.svg'

const renderApp = () => {
  const { pathname } = window.location

  const login = new page.LoginPage({ title: 'Войти' })
  const error404 = new page.ErrorPage({ description: 'The page you are looking for can’t be found', error: '404' })
  const error505 = new page.ErrorPage({ description: 'We are already fixing', error: '505' })
  const registration = new page.RegistrationPage({ title: 'Регистрация' })
  const home = new page.HomePage()
  const profile = new page.ProfilePage({ icon: exitIcon, avatarIcon: smileIcon, name: 'Имя' })
  const settings = new page.ProfileSettingsPage({ icon: exitIcon, avatarIcon: smileIcon })
  const navigation = new page.NavigationPage()

  switch (pathname) {
    case '/':
      render('#app', navigation)
      break
    case '/home':
      render('#app', home)
      break
    case '/login':
      render('#app', login)
      break
    case '/profile':
      render('#app', profile)
      break
    case '/settings':
      render('#app', settings)
      break
    case '/registration':
      render('#app', registration)
      break
    case '/404error':
      render('#app', error404)
      break
    case '/505error':
      render('#app', error505)
      break
  }
}

document.addEventListener('DOMContentLoaded', () => renderApp())
