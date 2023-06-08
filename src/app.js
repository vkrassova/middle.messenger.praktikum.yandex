import { loginPage, registrationPage } from './pages'
import './components'

const renderTemplate = (page) => {
  const root = document.querySelector('#app')
  root.innerHTML = page
}

const pathname = window.location.pathname

if (pathname === '/login') {
  console.log('login')
}

const renderApp = () => {
  const pathname = window.location.pathname

  // if (pathname === '/login') {
  //   console.log('login')
  // }

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
