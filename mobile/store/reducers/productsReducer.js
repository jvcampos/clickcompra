const INITIAL_STATE = [];

const productsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case 'GET_ALL_PRODUCTS':
      state = [
        ...INITIAL_STATE,
        action.products
      ]
    default:
      return state
  }
}

export default productsReducer