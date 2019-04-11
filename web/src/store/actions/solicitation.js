import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3001/api/',
})

export default function managerSolicitation(dados) {
    return (dispatch) => {
        const { manager } = dados
        const { supermarket } = dados
        console.log(manager)
        return api.post('user', manager)
        .then(response => {
          const { id } = response.data.data
          dispatch(supermarketSolicitation(id, supermarket))
        })
        .catch(() => {
          dispatch(errorSolicitation('Verificar dados inseridos !'))
        })
    }
  }

export const supermarketSolicitation = (id_manager, data_supermarket) => {
  return (dispatch) => {
    const json_supermarket = { id_manager, ...data_supermarket }
    return api.post('supermarket', json_supermarket)
      .then(response => {
        dispatch(successSolicitation('Solicitação de cadastro feita com sucesso !'))
      })
      .catch(() => {
        dispatch(errorSolicitation('Verificar dados inseridos !'))
      })
  }
}

export const successSolicitation = (message) => {
  return {
    type: 'SUCCESS_SOLICITATION',
    status: 'success',
    title: 'Solicitação realizada com sucesso',
    message,
  }
}

export const errorSolicitation = (message) => {
  return {
    type: 'ERROR_SOLICITATION',
    status: 'error',
    title: 'Não foi possível solicitar cadastro',
    message,
  }
}