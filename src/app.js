import LoginPage from './pages/login/login'

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
      // renderTemplate(LoginPage())
      break
  }
}

document.addEventListener('DOMLoading', () => renderApp())
