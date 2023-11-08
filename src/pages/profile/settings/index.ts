import Block from '../../../core/block'
import template from '../settings/index.templ'
import { Input, Button, Avatar } from '../../../components'
import { handleFocusOut, handleFormSubmit } from '../../../core/validation'
import { withUser } from '../../../core/store'

class BaseProfileSettingsPage extends Block {

  init() {
    const avatar = new Avatar({
      isNotActive: false,
      avatarSrc: 'https://ya-praktikum.tech/api/v2/resources' + this.props.avatar,
    })

    const inputLogin = new Input({
      name: 'login',
      placeholder: this.props.login,
      modificator: 'login',
      disabled: false,
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
        },
      },
    })

    const inputEmail = new Input({
      name: 'email',
      placeholder: this.props.email,
      modificator: 'email',
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
        },
      },
    })

    const inputFirsName = new Input({
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

    const inputNickName = new Input({
      name: 'nickname',
      placeholder: 'Имя в чате',
      modificator: 'nickname',
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

    const buttonSave = new Button({
      class: 'button--fill',
      type: 'submit',
      title: 'Сохранить',
      events: {
        click: (evt: Event) => {
          evt.preventDefault()
          handleFormSubmit(evt, this)
          // this.onSubmit()
        },
      },
    })

    this.children = {
      avatar: avatar,
      inputEmail: inputEmail,
      inputLogin: inputLogin,
      buttonSave: buttonSave,
      inputFirsName: inputFirsName,
      inputSecondName: inputSecondName,
      inputNickName: inputNickName,
      inputPhone: inputPhone,
    }
  }

  componentDidMount() {
    this.state = {
      login: '',
      password: '',
      first_name: '',
      second_name: '',
      nickname: '',
      phone: '',
      email: '',
    }
  }


  async onSubmit() {
    const data = {
      first_name: this.state.first_name as string,
      second_name: this.state.second_name as string,
      login: this.state.login as string,
      email: this.state.email as string,
      password: this.state.password as string,
      phone: this.state.phone as string,
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const ProfileSettingsPage = withUser(BaseProfileSettingsPage)
