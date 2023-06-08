import { loginPage, registrationPage } from './pages'
import './components'

const renderTemplate = (page) => {
  const root = document.querySelector('#app')
  root.innerHTML = page
}

const renderApp = () => {
  const { pathname } = window.location

  switch (pathname) {
    case '/login':
      console.log('login')
      renderTemplate(loginPage())
      break
    case '/registration':
      renderTemplate(registrationPage())
  }
}

document.addEventListener('DOMContentLoaded', () => renderApp())
