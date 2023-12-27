import AuthController from '../../controllers/auth-controller'
import { withUser } from '../../core/store'
import Block from '../../core/block'
import template from './index.template'
import { Button, ProfileFields, Avatar } from '../../components'
import avatarIcon from '../../img/smile.svg'

class BaseProfile extends Block {
  init() {
    const buttonExit = new Button({
      class: 'button--outline profile__exit',
      type: 'button',
      title: 'Выйти',
      events: {
        click: () => {
          AuthController.logout()
        },
      },
    })

    const avatar = new Avatar({
      isNotActive: true,
      avatarSrc: this.props.avatar
        ? `https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}`
        : (avatarIcon as string),
    })

    const email = new ProfileFields({
      name: 'Почта',
      value: this.props.email,
    })

    const login = new ProfileFields({
      name: 'Логин',
      value: this.props.login,
    })

    const first_name = new ProfileFields({
      name: 'Имя',
      value: this.props.first_name,
    })

    const second_name = new ProfileFields({
      name: 'Фамилия',
      value: this.props.second_name,
    })

    const display_name = new ProfileFields({
      name: 'Имя в чате',
      value: this.props.display_name,
    })

    const phone = new ProfileFields({
      name: 'Телефон',
      value: this.props.phone,
    })

    this.children = {
      email: email,
      login: login,
      first_name: first_name,
      second_name: second_name,
      display_name: display_name,
      phone: phone,
      buttonExit: buttonExit,
      avatar: avatar,
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const Profile = withUser(BaseProfile)
