import AuthController from '../../controllers/auth-controller'
import { withStore } from '../../core/store'
import Block from '../../core/block'
import template from './index.template'
import { Button } from '../../components'

interface ProfilePageProps {
  icon?: string
  avatarIcon?: string
  name?: string
}

export class BaseProfile extends Block {
  constructor(props: ProfilePageProps) {
    super({ ...props })
  }

  render() {
    const buttonExit = new Button({
      class: 'button--outline profile__exit',
      type: 'button',
      title: 'Выйти',
      events: {
        click: () => {
          console.log('Logout')
          AuthController.logout()
        },
      },
    })

    this.children = {
      buttonExit: buttonExit,
    }

    return this.compile(template, this.props)
  }
}

const withUser = withStore((state) => ({ ...state.user }))

export const Profile = withUser(BaseProfile)
