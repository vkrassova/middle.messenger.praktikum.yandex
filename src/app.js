import LoginPage from './pages/login/login'
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
      renderTemplate(LoginPage())
      break
  }
}

document.addEventListener('DOMContentLoaded', () => renderApp())
