import template from './index.tmpl'
import Block from '../../core/block'
import { Button, Input } from '../../components/index'
import { handleFocusOut, handleFormSubmit } from '../../core/validation'

interface LoginPageProps {
  title: string
}

class LoginPage extends Block {
  constructor(props?: LoginPageProps) {
    super('div', {
      ...props,
      events: {
        submit: (event: Event) => {
          handleFormSubmit(event, this)
        },
      },
    })
  }

  componentDidMount() {
    this.state = {
      login: '',
      password: '',
    }
  }

  render() {
    const button = new Button({
      class: 'button--fill',
      type: 'submit',
      title: 'Войти',
    })

    const inputLogin = new Input({
      name: 'login',
      placeholder: 'Логин',
      modificator: 'login',
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
        },
      },
    })

    const inputPassword = new Input({
      name: 'password',
      placeholder: 'Пароль',
      type: 'password',
      modificator: 'password',
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
        },
      },
    })

    this.children = {
      button: button,
      inputLogin: inputLogin,
      inputPassword: inputPassword,
    }

    return this.compile(template, this.props)
  }
}

export default LoginPage
