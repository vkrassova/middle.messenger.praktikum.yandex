import Block from '../../../core/block'
import template from '../settings/index.templ'
import { Input, Button } from '../../../components'
import { handleFocusOut, handleFormSubmit } from '../../../core/validation'

interface ProfilePageProps {
  icon: string
  avatarIcon: string
}

class ProfileSettingsPage extends Block {
  constructor(props: ProfilePageProps) {
    super({
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
      first_name: '',
      second_name: '',
      nickname: '',
      phone: '',
      email: '',
    }
  }

  render() {
    const inputLogin = new Input({
      name: 'login',
      placeholder: 'Логин',
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
      placeholder: 'Почта',
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
    })

    this.children = {
      inputEmail: inputEmail,
      inputLogin: inputLogin,
      buttonSave: buttonSave,
      inputFirsName: inputFirsName,
      inputSecondName: inputSecondName,
      inputNickName: inputNickName,
      inputPhone: inputPhone,
    }

    return this.compile(template, this.props)
  }
}

export default ProfileSettingsPage
