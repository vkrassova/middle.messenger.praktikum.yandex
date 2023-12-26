import Block from '../../../core/block'
import template from '../edit-password/index.templ'
import { Input, Button, Avatar } from '../../../components'
import { handleFocusOut, handleFormSubmit } from '../../../core/validation'
import { withUser } from '../../../core/store'
import { PasswordUpdate } from '../../../models/user'
import UserController from '../../../controllers/user-controller'
import avatarIcon from '../../../img/smile.svg'

class BaseEditPasswordPage extends Block {
  init() {
    const avatar = new Avatar({
      isNotActive: true,
      avatarSrc: this.props.avatar
        ? `https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}`
        : (avatarIcon as string),
    })

    const oldPassword = new Input({
      name: 'oldPassword',
      type: 'password',
      modificator: 'password',
      labelText: 'Старый пароль',
      events: {
        focusout: (event) => {
          // handleFocusOut(event, this)
        },
      },
    })

    const newPassword = new Input({
      name: 'password',
      type: 'password',
      modificator: 'password',
      labelText: 'Новый пароль',
      events: {
        focusout: (event) => {
          // handleFocusOut(event, this)
        },
      },
    })

    const repeatPassword = new Input({
      name: 'password_repeat',
      type: 'password',
      modificator: 'password_repeat',
      labelText: 'Повторите пароль',
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
          // handleFormSubmit(evt, this)
          console.log(this.state)
          // this.onSubmit()
        },
      },
    })

    this.children = {
      avatar: avatar,
      oldPassword: oldPassword,
      newPassword: newPassword,
      repeatPassword: repeatPassword,
      buttonSave: buttonSave,
    }
  }

  componentDidMount() {
    this.state = {
      oldPassword: '',
      newPassword: '',
    }
  }

  async onSubmit() {
    const data: PasswordUpdate = {
      oldPassword: this.state.oldPassword as string,
      newPassword: this.state.newPassword as string,
    }

    // UserController.updatePassword(data as PasswordUpdate)
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const EditPasswordPage = withUser(BaseEditPasswordPage)
