import template from './index.tmpl'
import Block from '../../core/block'
import { Button, Input } from '../../components/index'
import { handleFocusOut, handleFormSubmit } from '../../core/validation'
import AuthController from '../../controllers/auth-controller'
import { SignInData } from '../../models/user'
import Router from '../../core/router'
import { Routes } from '../../utils/constants'

export class LoginPage extends Block {
  login: string | null = null
  password: string | null = null

  init() {
    const button = new Button({
      class: 'button--fill',
      type: 'submit',
      title: 'Войти',
      events: {
        click: (evt: Event) => {
          evt.preventDefault()
          handleFormSubmit(evt, this)
          this.onSubmit()
        },
      },
    })

    const buttonRegister = new Button({
      class: 'button--outline',
      type: 'button',
      title: 'Зарегистрироваться',
      events: {
        click: () => {
          Router.go(Routes.Register)
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
      buttonRegister: buttonRegister,
      inputLogin: inputLogin,
      inputPassword: inputPassword,
    }
  }

  componentDidMount() {
    this.state = {
      login: '',
      password: '',
    }
  }

  async onSubmit() {
    const data: SignInData = {
      login: this.state.login as string,
      password: this.state.password as string,
    }

    await AuthController.signin(data as SignInData)
  }

  render() {
    return this.compile(template, this.props)
  }
}
