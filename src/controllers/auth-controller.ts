import { AuthAPI, SignUpData, SignInData } from '../api/auth-api'
import router from '../core/router'
import store from '../core/store'

class AuthController {
  private api = new AuthAPI()

  async signin(data: SignInData) {
    try {
      await this.api.signin(data)

      await this.fetchUser()

      router.go('/profile')
    } catch (e) {
      console.error(e)
    }
  }

  async signup(data: SignUpData) {
    try {
      await this.api.signup(data)

      await this.fetchUser()

      router.go('/profile')
    } catch (e) {
      console.log(e)
    }
  }

  async logout() {
    try {
      await this.api.logout()
      store.set('user', undefined)
      router.go('/')
    } catch (e) {
      console.log(e)
    }
  }

  async fetchUser() {
    const user = await this.api.read()

    store.set('user', user)

    console.log(user)
  }
}

export default new AuthController()
