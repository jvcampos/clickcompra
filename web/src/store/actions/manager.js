import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3001/api/',
})

export function getManager(id_manager) {
  return (dispatch) => {
    api.get(`user/${id_manager}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        dispatch(receiveManager(response.data.data))
      })
  }
}

export function updateManager(data_manager) {
  const { id } = data_manager
  return (dispatch) => {
    api.put(`user/${id}`, data_manager , {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(response => {
      dispatch(updatedManager(response.data.data))
    })
  }
}

export const updatedManager = (data) => {
  return {
    type: 'UPDATE_MANAGER',
    data
  }
}

export const receiveManager = (data) => {
  return {
    type: 'GET_MANAGER',
    data
  }
}
