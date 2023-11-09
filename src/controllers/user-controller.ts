import { UserAPI } from '../api/user-api'
import { User, PasswordUpdate } from '../models/user'
import store from '../core/store'
import router from '../core/router'
import { Routes } from '../utils/constants'

class UserController {
  private api = new UserAPI()

  public async updateUsetData(data: User): Promise<void> {
    try {
      const user = await this.api.update(data)

      store.set('user', user)

      router.go(Routes.Profile)
    } catch (e) {
      console.error(e)
    }
  }

  public async updateAvatar(data: File): Promise<void> {
    try {
      const user = await this.api.updateAvatar(data)

      store.set('user', user)
    } catch (e) {
      console.error(e)
    }
  }

  public async updatePassword(data: PasswordUpdate): Promise<void> {
    try {
      await this.api.updatePassword(data)

      router.go(Routes.Profile)
    } catch (e) {
      console.error(e)
    }
  }
}

export default new UserController()
