import {combineReducers} from 'redux'
import userReducer from './userReducer'
import categoriesReducer from './categoriesReducer';

const reducers = combineReducers({
  UserReducer: userReducer,
  CategoriesReducer: categoriesReducer
})

export default reducers
