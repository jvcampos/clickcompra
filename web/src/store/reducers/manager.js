//Reducer
export default function solicitation(state = {}, action) {
  switch (action.type) {
    case 'GET_MANAGER':
      return {
        ...state,
        address: action.data.address,
        cpf: action.data.cpf,
        email: action.data.email,
        name: action.data.name,
      }
    case 'UPDATE_MANAGER':
      return action.data
    default:
      return state;
  }
}
