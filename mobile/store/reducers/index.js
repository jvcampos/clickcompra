import {combineReducers} from 'redux'
import userReducer from './userReducer'
import categoriesReducer from './categoriesReducer';
import productsReducer from './productsReducer'
import cartReducer from './cartReducer';

const reducers = combineReducers({
  UserReducer: userReducer,
  CategoriesReducer: categoriesReducer,
  ProductReducer: productsReducer,
  CartReducer: cartReducer,  
})

export default reducers
