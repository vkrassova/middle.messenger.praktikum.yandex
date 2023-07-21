import { AuthAPI, SignUpDataType, SignInDataType } from '../api/auth-api'

class AuthController {
  private api = new AuthAPI()

  signin(data: SignInDataType) {
    this.api.signin(data)
  }

  signup(data: SignUpDataType) {
    this.api.signup(data)
  }

  logout() {
    this.api.logout()
  }

  fetchUser() {
    this.api.getUser()
  }
}

export default new AuthController() //singleton
