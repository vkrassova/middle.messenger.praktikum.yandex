import Block from '../../../core/block'
import template from '../edit-profile/index.templ'
import { Input, Button, Avatar } from '../../../components'
import { handleFocusOut, handleFormSubmit } from '../../../core/validation'
import { withUser } from '../../../core/store'
import { User } from '../../../models/user'
import UserController from '../../../controllers/user-controller'

class BaseProfileSettingsPage extends Block {
  init() {
    const avatar = new Avatar({
      isNotActive: false,
      avatarSrc: 'https://ya-praktikum.tech/api/v2/resources' + this.props.avatar,
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
                avatarSrc: 'https://ya-praktikum.tech/api/v2/resources' + this.props.avatar,
              })
              console.log(avatar)
            } catch (e) {
              console.log(e)
            }
          }
        },
      },
    })

    const inputLogin = new Input({
      name: 'login',
      placeholder: this.props.login,
      modificator: 'login',
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
      placeholder: this.props.first_name,
      modificator: 'first_name',
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
        },
      },
    })

    const inputSecondName = new Input({
      name: 'second_name',
      placeholder: this.props.second_name,
      modificator: 'second_name',
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
        },
      },
    })

    const inputNickName = new Input({
      name: 'nickname',
      placeholder: this.props.display_name,
      modificator: 'nickname',
      events: {
        focusout: (event) => {
          handleFocusOut(event, this)
        },
      },
    })

    const inputPhone = new Input({
      name: 'phone',
      placeholder: this.props.phone,
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
          // handleFormSubmit(evt, this)
          console.log(this.state)
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
    const data: User = {
      display_name: this.state.display_name as string,
      first_name: this.state.first_name as string,
      second_name: this.state.second_name as string,
      login: this.state.login as string,
      email: this.state.email as string,
      password: this.state.password as string,
      phone: this.state.phone as string,
    }

    UserController.updateUsetData(data as User)
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const ProfileEditPage = withUser(BaseProfileSettingsPage)
