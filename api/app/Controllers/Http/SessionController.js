'use strict'

class SessionController {
  async createSession({ request, auth }) {
    const { email, password } = request.all()
    console.log(email,password)
    const token = await auth.attempt(email, password)
    return token
  }
}

module.exports = SessionController
