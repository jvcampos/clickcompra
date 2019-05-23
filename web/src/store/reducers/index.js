import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'

import history from '../../routes/history'
import login from './login'
import renderComponent from './renderComponent'
import solicitation from './solicitation'
import categories from './categories'
import products from './products'
import manager from './manager'

const rootReducer = combineReducers({
    login,
    renderComponent,
    solicitation,
    categories,
    products,
    manager,
    router: connectRouter(history)
})

export default rootReducer;
