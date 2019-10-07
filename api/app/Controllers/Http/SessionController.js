'use strict'
const UserModel = use('App/Models/User');
const Database = use('Database')
const SupermarketModel = use('App/Models/Supermarket')
class SessionController {
  async createSession({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    const userData = await UserModel.findBy('email', email)
    const { id, role, mobile } = userData
    if (role !== 'ADMIN') {
      if (mobile !== 'TRUE') {
        console.log('Gerente id: ', id)
        const superData = await SupermarketModel.findBy('id_manager', id)
        console.log('Result Super: ', superData)
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
          id,
          role,
          status: 'APROVED'
        }
      }
    } else {
      return {
        id,
        token,
        role,
        status: 'APROVED'
      }
    }
  }
}

module.exports = SessionController
