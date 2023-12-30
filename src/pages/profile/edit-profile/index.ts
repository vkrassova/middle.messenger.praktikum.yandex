import Block from '../../../core/block'
import template from '../edit-profile/index.templ'
import { Input, Button, Avatar } from '../../../components'
import { handleFocusOut } from '../../../core/validation'
import { withUser } from '../../../core/store'
import { User } from '../../../models/user'
import UserController from '../../../controllers/user-controller'
import avatarIcon from '../../../img/smile.svg'
import { RESOURCES_URL } from '../../../utils/constants'
import Router from '../../../core/router'
import { Routes } from '../../../utils/constants'

class BaseProfileSettingsPage extends Block {
  init() {
    const avatar = new Avatar({
      isNotActive: false,
      avatarSrc: this.props.avatar ? RESOURCES_URL + this.props.avatar : (avatarIcon as string),
      events: {
        change: async (event) => {
          const target = event.target as HTMLInputElement
          const files = target?.files

          if (files !== null) {
            try {
              await UserController.updateAvatar(files[0])
              const avatar = this.children.avatar as Block
              avatar.setProps({
                ...avatar.props,
                avatarSrc: RESOURCES_URL + this.props.avatar,
              })
            } catch (e) {
              console.log(e)
            }
          }
        },
      },
    })

    const inputLogin = new Input({
      name: 'login',
      value: this.props.login,
      modificator: 'login',
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
        },
      },
    })

    const inputEmail = new Input({
      name: 'email',
      value: this.props.email,
      modificator: 'email',
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
        },
      },
    })

    const inputFirsName = new Input({
      name: 'first_name',
      value: this.props.first_name,
      modificator: 'first_name',
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
        },
      },
    })

    const inputSecondName = new Input({
      name: 'second_name',
      value: this.props.second_name,
      modificator: 'second_name',
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
        },
      },
    })

    const inputNickName = new Input({
      name: 'display_name',
      value: this.props.display_name,
      modificator: 'display_name',
      events: {
        focusout: (event) => {
          const target = event?.target as HTMLInputElement
          this.state[target.name] = target?.value
        },
      },
    })

    const inputPhone = new Input({
      name: 'phone',
      value: this.props.phone,
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
          this.onSubmit()
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
      display_name: '',
      phone: '',
      email: '',
    }
  }

  async onSubmit() {
    const data: User = {
      display_name: this.state.display_name as string,
      first_name: this.state.first_name as string,
      second_name: this.state.second_name as string,
      login: this.state.login as string,
      email: this.state.email as string,
      password: this.state.password as string,
      phone: this.state.phone as string,
    }

    const values = Object.values(data)

    const errors = Array.from(document?.querySelectorAll('.error-message'))

    const isCheckErrorMessage = errors.every((el) => el.textContent?.length === 0)
    const isCheckEmptyFields = values.some((el) => el !== undefined)

    if (!isCheckEmptyFields) {
      Router.go(Routes.Profile)
    }

    if (isCheckEmptyFields && isCheckErrorMessage) {
      await UserController.updateUsetData(data as User)
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const ProfileEditPage = withUser(BaseProfileSettingsPage)
