import './components'

import * as page from './pages/index'

import { render } from './core/render-DOM'

const renderApp = () => {
  const { pathname } = window.location

  const login = new page.LoginPage({ title: 'Войти' })
  const error = new page.ErrorPage({ description: 'fdsfdsf', error: '404' })
  const registration = new page.RegistrationPage({ title: 'Регистрация' })

  console.log(error)
  console.log(registration)

  switch (pathname) {
    case '/home':
      render('#app', login)
      break
    case '/login':
      render('#app', login)
      break
    case '/registration':
      render('#app', registration)
      break
    case '/404error':
      render('#app', error)
      break
  }
}

document.addEventListener('DOMContentLoaded', () => renderApp())
