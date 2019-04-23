/* eslint-disable no-duplicate-case */
export default function categories(state = [], action) {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return [
        ...state,
        {
          id: action.data.id,
          name_categorie: action.data.name_categorie,
          description: action.data.description
        }
      ]
    case 'GET_ALL_CATEGORY':
      return action.data
    case 'DELETE_CATEGORY':
      return state.filter(categorie => categorie.id !== action.id)
    default:
      return state;
  }
}
