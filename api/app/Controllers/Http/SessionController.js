'use strict'
const UserModel = use('App/Models/User');
const SupermarketModel = use('App/Models/Supermarket')
class SessionController {
  async createSession({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    const userData = await UserModel.findBy('email', email)
    const { id, role, mobile } = userData
    if (role !== 'ADMIN') {
      if (mobile !== 'TRUE') {
        const superData = await SupermarketModel.findBy('id_manager', id)
        if (superData.status === 'APROVED') {
          return {
            token,
            role,
            status: superData.status,
            id_supermarket: superData.id,
            id,
          }
        }
      }
      else {
        return {
          token,
          role,
          status: 'APROVED'
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
