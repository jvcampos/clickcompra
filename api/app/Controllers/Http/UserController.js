'use strict'

const User = use('App/Models/User');
const HandlerMessage = use('App/Services/HandlerMessage')

class UserController {
  async create({ request, response }) {
    const { cpf, name, address, email, password, role } = request.all();
    try {
        const user = await User.create({
        cpf,
        name,
        address,
        email,
        password,
        role
      })
      HandlerMessage.handlerSuccess(response, user)
    } catch (error) {
      HandlerMessage.handlerError(response, error)
    }
  }
}

module.exports = UserController
