import AuthController from '../../controllers/auth-controller'
import Block from '../../core/block'
import template from './index.template'
import { Button } from '../../components'

interface ProfilePageProps {
  icon?: string
  avatarIcon?: string
  name?: string
}

class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super({ ...props })
  }

  componentDidMount(): void {
    AuthController.fetchUser()
  }

  render() {
    const buttonExit = new Button({
      class: 'button--outline profile__exit',
      type: 'button',
      title: 'Выйти',
      events: {
        click: () => {
          AuthController.logout()
          console.log('Logout')
        },
      },
    })

    this.children = {
      buttonExit: buttonExit,
    }

    return this.compile(template, this.props)
  }
}

export default ProfilePage
