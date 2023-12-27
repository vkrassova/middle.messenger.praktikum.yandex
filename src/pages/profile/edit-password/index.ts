import Block from '../../../core/block'
import template from '../edit-password/index.templ'
import { Input, Button, Avatar } from '../../../components'
import { handleFocusOut, handleRepeatPassword, passwordValidation } from '../../../core/validation'
import { withUser } from '../../../core/store'
import { PasswordUpdate } from '../../../models/user'
import UserController from '../../../controllers/user-controller'
import avatarIcon from '../../../img/smile.svg'
import { RESOURCES_URL } from '../../../utils/constants'

class BaseEditPasswordPage extends Block {
  init() {
    const avatar = new Avatar({
      isNotActive: true,
      avatarSrc: this.props.avatar ? RESOURCES_URL + this.props.avatar : (avatarIcon as string),
    })

    const oldPassword = new Input({
      name: 'old_password',
      type: 'password',
      modificator: 'password',
      labelText: 'Старый пароль',
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
        },
      },
    })

    const newPassword = new Input({
      name: 'new_password',
      type: 'password',
      modificator: 'password',
      labelText: 'Новый пароль',
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
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
          const target = event?.target as HTMLInputElement
          this.state[target.name] = target?.value
          console.log(this.state)
          handleRepeatPassword(event, this.state.password_repeat as string, this.state.new_password as string)
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
          this.onSubmit()
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
      old_password: '',
      new_password: '',
      password_repeat: '',
    }
  }

  async onSubmit() {
    const data: PasswordUpdate = {
      oldPassword: this.state.old_password as string,
      newPassword: this.state.new_password as string,
    }

    if (
      this.state.new_password === this.state.password_repeat &&
      passwordValidation(data.oldPassword) === null &&
      passwordValidation(data.newPassword) === null
    ) {
      await UserController.updatePassword(data as PasswordUpdate)
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const EditPasswordPage = withUser(BaseEditPasswordPage)
