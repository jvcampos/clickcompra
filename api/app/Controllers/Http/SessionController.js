'use strict'
const UserModel = use('App/Models/User');
class SessionController {
  async createSession({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    const userData = await UserModel.findBy('email', email)
    const { role } = userData
    return {
      token,
      role
    }
  }
}

module.exports = SessionController
