
import _ from 'lodash';
const INITIAL_STATE = [];

const cartReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case 'ADD_PRODUCT':
      return [...state, action.product]
      case 'REMOVE_FROM_PRODUCT':
        return state.filter(product => !_.isEqual(product, action.product))
    default:
      return state
  }
}

export default cartReducer
