import AuthController from '../../controllers/auth-controller'
import { withStore } from '../../core/store'
import Block from '../../core/block'
import template from './index.template'
import { Button, ProfileFields } from '../../components'

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

    const login = new ProfileFields({
      name: 'bbkbcadkc',
      value: this.props.login,
    })

    this.children = {
      login: login,
      buttonExit: buttonExit,
    }

    console.log(this.props)
  }

  render() {
    return this.compile(template, this.props)
  }
}

const withUser = withStore((state) => ({ ...state.user }))

export const Profile = withUser(BaseProfile)
