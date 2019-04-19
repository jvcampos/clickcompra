// reducer

export default function categories(state = [], action){
  switch(action.type){
    case 'ADD_PRODUCT':
      return [
        ...state,
        {
          id: action.data.id,
          id_category: action.data.id_category,
          name_product: action.data.name_product,
          imageBase64: action.data.imageBase64,
          description: action.data.description,
          value: action.data.value,
          amount: action.data.amount,
        }
      ]
      case 'GET_ALL_PRODUCT':
        return action.data
      default:
       return state
  }
}