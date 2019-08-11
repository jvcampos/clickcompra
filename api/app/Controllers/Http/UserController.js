'use strict'

const Database = use('Database')
const UserModel = use('App/Models/User');
const HandlerMessage = use('App/Services/HandlerMessage')

const Hash = use('Hash')

class UserController {
  async create({ request, response }) {
    const { cpf, name, address, email, password, role, mobile } = request.all();
    try {
        const user = await UserModel.create({
        cpf,
        name,
        address,
        email,
        password,
        role,
        mobile
      })
      HandlerMessage.handlerSuccess(response, user)
    } catch (error) {
      HandlerMessage.handlerError(response, error)
    }
  }

  async update({ request, params, response }) {
    try {
      const { id } = params;
      const { cpf, name, address, email, password, password_new } = request.all();
      const user = await UserModel.find(id)
      const compare_password = await Hash.verify(password, user.password)
      if (compare_password === true){
        const crypto_password = await Hash.make(password_new)
        await Database
          .table('users')
          .where('id', id)
          .update({ cpf, name, address, email, password: crypto_password })
        const user_updated = await UserModel.find(id)
        HandlerMessage.handlerUpdate(response, user_updated)
      } else {
        HandlerMessage.handlerError(response, error)
      }
    }
    catch (error) {
      HandlerMessage.handlerError(response, error)
    }
  }

  async delete({ params, response }) {
    try {
      const { id } = params;
      const user = await UserModel.find(id)
      await user.delete();
      HandlerMessage.handlerDelete(response, user)
    } catch (error) {
      HandlerMessage.handlerError(response, error)
    }
  }

  async getUser({ params, response }) {
    const { id } = params;
    const user = await UserModel.find(id)
    if (user) {
      HandlerMessage.handlerSuccess(response, user)
    }else{
      HandlerMessage.handlerNotFound(response);
    }
  }

  async getAll({ request }) {
    const { page } = request.all()
    const users = await Database
      .from('users')
      .paginate(page, 1)
    return users
  }
}

module.exports = UserController
