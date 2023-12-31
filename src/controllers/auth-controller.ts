import { AuthAPI } from '../api/auth-api'
import { SignInData, SignUpData } from '../models/user'
import router from '../core/router'
import store from '../core/store'
import { Routes } from '../utils/constants'

class AuthController {
  private api = new AuthAPI()

  async signin(data: SignInData) {
    try {
      await this.api.signin(data)

      await this.fetchUser()

      router.go(Routes.Home)
    } catch (e) {
      console.error(e)
    }
  }

  async signup(data: SignUpData) {
    try {
      await this.api.signup(data)

      await this.fetchUser()

      router.go(Routes.Profile)
    } catch (e) {
      console.log(e)
    }
  }

  async logout() {
    try {
      await this.api.logout()
      store.set('user', undefined)
      router.go(Routes.Index)
    } catch (e) {
      console.log(e)
    }
  }

  async fetchUser() {
    const user = await this.api.read()

    store.set('user', user)
  }
}

export default new AuthController()
