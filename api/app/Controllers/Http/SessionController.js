'use strict'
const UserModel = use('App/Models/User');
const SupermarketModel = use ('App/Models/Supermarket')
class SessionController {
  async createSession({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    const userData = await UserModel.findBy('email', email)
    const { id, role } = userData
    if(role !== 'ADMIN'){
      const { status } = await SupermarketModel.findBy('id_manager', id)
      if (status === 'APROVED') {
        return {
          token,
          role,
          status,
          id
        }
      }
    } else {
      return {
        token,
        role,
        status: 'APROVED'
      }
    }
  }
}

module.exports = SessionController
