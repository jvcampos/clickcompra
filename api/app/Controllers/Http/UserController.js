'use strict'

const Database = use('Database')
const UserModel = use('App/Models/User');
const ForgotPasswordModel = use('App/Models/ForgotPassword')
const HandlerMessage = use('App/Services/HandlerMessage')
const uuidv1 = require('uuid/v1');
const Mail = use('Mail')

const Hash = use('Hash')

class UserController {
  async create({ request, response }) {
    const { cpf, name, address, email, password, role, mobile } = request.all();
    const isThereCpf = await UserModel.findBy('cpf', cpf)
    const isThereEmail = await UserModel.findBy('email', email)
    if(isThereCpf){
      return response.status(406).json({msg: "Já Existe um usuário com esse CPF"})
    } else if(isThereEmail){
      return response.status(406).json({msg: "Já Existe um usuário com esse Email"})
    }else {
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
        return response.status(200).json({success: "Cadastrado com sucesso!", data: user})
      } catch (error) {
        return HandlerMessage.handlerError(response, error)
      }
    }
  }

  async forgotPassword ({request}) {
    const { email } = request.all();
    const token = uuidv1();
    //PRECISA VALIDAR SE O USUÁRIO EXISTE CADASTRADO NA BASE
    const user = await UserModel.findBy('email', email)
    if(user){
      const result = await ForgotPasswordModel.create({email: email, token: token})
      if(result){
        await Mail.raw(`<a target="_blank" href="http://localhost:3000/changepassword/${token}">Clique aqui para alterar sua senha</a>`, (message) => {
          message.from('vinicius_almeidasilva@outlook.com')
          message.to(email)
        })
      }
      return result;
    } else{
      return {success: false, msg: 'Usuário não encontrado'}
    }
  }

  async getUserToken({ params, response }) {
    const { token } = params;
    const user = await ForgotPasswordModel.findBy('token', token)
    if (user) {
      HandlerMessage.handlerSuccess(response, user)
    }else{
      HandlerMessage.handlerNotFound(response);
    }
  }

  async updatePassword({ request, params, response }) {
    const { email, newPassword } = request.all();
    console.log(email)
    console.log(newPassword)
    try {
      const user = await UserModel.findBy('email', email)
      if (user){
        const crypto_password = await Hash.make(newPassword)
        await Database
        .table('users')
        .where('id', user.id)
        .update('password', crypto_password)

        const test = await Database
        .table('forgot_passwords')
        .where('email', email)
        .delete()
        HandlerMessage.handlerUpdate(response, user)
      } else {
        HandlerMessage.handlerError(response, error)
      }
    }
    catch (error) {
      HandlerMessage.handlerError(response, error)
    }
  }

  async update({ request, params, response }) {
    console.log('aquiiiiii')
    try {
      const { id } = params;
      const { cpf, name, address, email, password, password_new } = request.all();
      const user = await UserModel.find(id)
      if(password && password_new){
        const compare_password = await Hash.verify(password, user.password)
        console.log(compare_password)
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
      } else {
        await Database
        .table('users')
        .where('id', id)
        .update({ cpf, name, address, email})
        const user_updated = await UserModel.find(id)
        HandlerMessage.handlerUpdate(response, user_updated)
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

{/* <a target="_blank" href="http://localhost:3000/changepassword/${token}"> */}
