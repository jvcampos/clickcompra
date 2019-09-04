const INITIAL_STATE = [];

const categoriesReducer = (state = INITIAL_STATE, action) => {
  console.log(action)
  switch (action.type) {
    case 'GET_ALL_CATEGORIES':
      state = [
        ...INITIAL_STATE,
        action.categories
      ]
    default:
      return state
  }
}

export default categoriesReducer
