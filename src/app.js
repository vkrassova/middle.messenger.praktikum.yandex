import { loginPage, registrationPage, profilePage, errorPage, homePage } from './pages'
import './components'

import exitIcon from './img/exit-icon.svg'
import smileIcon from './img/smile.svg'

const renderTemplate = (page) => {
  const root = document.querySelector('#app')
  root.innerHTML = page
}

const renderApp = () => {
  const { pathname } = window.location

  switch (pathname) {
    case '/':
      renderTemplate(homePage())
      break
    case '/login':
      renderTemplate(loginPage())
      break
    case '/registration':
      renderTemplate(registrationPage())
      break
    case '/profile':
      renderTemplate(profilePage({ icon: exitIcon, avatarIcon: smileIcon }))
      break
    case '/error404':
      renderTemplate(
        errorPage({
          error: '404',
          description: 'The page you are looking for can’t be found',
        })
      )
      break
    case '/error505':
      renderTemplate(
        errorPage({
          error: '505',
          description: 'We are already fixing',
        })
      )
      break
  }
}

document.addEventListener('DOMContentLoaded', () => renderApp())
