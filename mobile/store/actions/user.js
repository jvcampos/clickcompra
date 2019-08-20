import superagent from 'superagent'
import AsyncStorage from '@react-native-community/async-storage';

export function createUser(user) {
  return (dispatch) => {
    superagent
      .post('http://10.0.2.2:3001/api/user')
      .query({
        cpf: user.cpf,
        name: user.name,
        address: user.address,
        email: user.email,
        password: user.password,
        role: 2,
        mobile: 1
      })
      .then(res => {
        console.log('Cadastrou com sucesso')
        dispatch({
          type: 'REGISTER',
          payload: {
            redirect: true,
            message: 'Cadastrado com sucesso!😃'
          }
        })
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: 'REGISTER',
          payload: {
            redirect: false,
            message: 'Por favor, verifique os dados'
          }
        })
      })
  }
}

export function login(user) {
  return async (dispatch) => {
    try {
      const res = await superagent
        .post('http://10.0.2.2:3001/api/login')
        .query({
          email: user.email,
          password: user.password,
        })
      await AsyncStorage.setItem('@ClickCompra:token', res.body.token.token)
      console.log('Login feito com sucesso')
      console.log('AsyncStorage: ', await AsyncStorage.getItem('@ClickCompra:token'))
      dispatch({
        type: 'LOGIN',
        payload: {
          login: true,
          message: 'Login feito com sucesso!😃'
        }
      })
    } catch (err) {
      console.log(err)
      dispatch({
        type: 'LOGIN',
        payload: {
          message: 'Erro ao fazer login'
        }
      })
    }
  }
}