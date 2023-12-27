import Block from '../../core/block'
import template from './index.temp'

import { Button, Input } from '../../components'

import { handleFocusOut } from '../../core/validation'

import AuthController from '../../controllers/auth-controller'

import { SignUpData } from '../../models/user'
import {
  handleRepeatPassword,
  loginValidation,
  emailValidation,
  nameValidation,
  messageValidation,
  passwordValidation,
  phoneValidation,
} from '../../core/validation'

export class RegistrationPage extends Block {
  login: string | null = null
  password: string | null = null
  passwordSecond: string | null = null
  email: string | null = null
  firstName: string | null = null
  secondName: string | null = null
  phone: string | null = null

  init() {
    const buttonSubmit = new Button({
      class: 'button--outline',
      type: 'submit',
      title: 'Зарегистрироваться',
      events: {
        click: (evt: Event) => {
          evt.preventDefault()
          this.onSubmit()
        },
      },
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
          const target = event?.target as HTMLInputElement
          this.state[target.name] = target?.value
          handleRepeatPassword(event, this.state.password as string, this.state.password_repeat as string)
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

  getFieldsError() {
    const fieldsError = [
      emailValidation(this.state.email as string),
      loginValidation(this.state.login as string),
      nameValidation(this.state.name as string),
      messageValidation(this.state.first_name as string),
      messageValidation(this.state.second_name as string),
      phoneValidation(this.state.phone as string),
      passwordValidation(this.state.password as string),
    ]

    return fieldsError
  }

  async onSubmit() {
    const data: SignUpData = {
      first_name: this.state.first_name as string,
      second_name: this.state.second_name as string,
      login: this.state.login as string,
      email: this.state.email as string,
      password: this.state.password as string,
      phone: this.state.phone as string,
    }

    let isCheckEmptyFields
    let isCheckErrorMessage

    const values = Object.values(data)

    values.forEach((el) => {
      if (el === undefined) {
        isCheckEmptyFields = false
      } else {
        isCheckEmptyFields = true
      }
    })

    this.getFieldsError().forEach((el) => {
      if (el !== null) {
        isCheckErrorMessage = false
      } else {
        isCheckErrorMessage = true
      }
    })

    if (isCheckEmptyFields && isCheckErrorMessage) {
      await AuthController.signup(data as SignUpData)
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
