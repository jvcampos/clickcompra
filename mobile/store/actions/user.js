import superagent from 'superagent'

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