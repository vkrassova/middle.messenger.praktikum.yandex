import Block from '../../core/block'
import template from './index.temp'

import { Button, Input } from '../../components'

import { handleFocusOut, handleFormSubmit } from '../../core/validation'

interface RegistrationPageProps {
  title: string
}

class RegistrationPage extends Block {
  constructor(props: RegistrationPageProps) {
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
      email: '',
      first_name: '',
      second_name: '',
      phone: '',
      password: '',
      password_repeat: '',
    }
  }

  render() {
    const buttonSubmit = new Button({
      class: 'button--outline',
      type: 'submit',
      title: 'Регистрация',
    })

    const buttonLogin = new Button({
      class: 'button--fill',
      type: 'button',
      title: 'Войти',
    })

    const inputEmail = new Input({
      name: 'email',
      placeholder: 'Почта',
      modificator: 'email',
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
        },
      },
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

    const inputFirstName = new Input({
      name: 'first_name',
      placeholder: 'Имя',
      modificator: 'first_name',
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
        },
      },
    })

    const inputSecondName = new Input({
      name: 'second_name',
      placeholder: 'Фамилия',
      modificator: 'second_name',
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
        },
      },
    })

    const inputPhone = new Input({
      name: 'phone',
      placeholder: 'Телефон',
      modificator: 'phone',
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
        },
      },
    })

    const inputPassword = new Input({
      name: 'password',
      placeholder: 'Пароль',
      modificator: 'password',
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
        },
      },
    })

    const inputPasswordRepeat = new Input({
      name: 'password_repeat',
      placeholder: 'Пароль (еще раз)',
      modificator: 'password_repeat',
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
        },
      },
    })

    this.children = {
      buttonSubmit: buttonSubmit,
      buttonLogin: buttonLogin,
      inputEmail: inputEmail,
      inputLogin: inputLogin,
      inputFirstName: inputFirstName,
      inputSecondName: inputSecondName,
      inputPhone: inputPhone,
      inputPassword: inputPassword,
      inputPasswordRepeat: inputPasswordRepeat,
    }

    return this.compile(template, this.props)
  }
}

export default RegistrationPage
