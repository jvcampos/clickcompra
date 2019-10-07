import superagent from 'superagent'
import AsyncStorage from '@react-native-community/async-storage';

export function login(user) {
  return async (dispatch) => {
    try {
      const res = await superagent
        .post('http://10.0.2.2:3001/api/login')
        .query({
          email: user.email,
          password: user.password,
        })
        console.log(res)
      await AsyncStorage.setItem('userToken', res.body.token.token)
      await AsyncStorage.setItem('idUser', res.body.token.id)
      console.log('AsyncStorage: ', await AsyncStorage.getItem('userToken'))
      console.log('AsyncStorage: ', await AsyncStorage.getItem('idUser'))
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
