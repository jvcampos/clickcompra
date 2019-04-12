import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'

import history from '../../routes/history'
import login from './login'
import renderComponent from './renderComponent'
import solicitation from './solicitation'
import categories from './categories'

const rootReducer = combineReducers({
    login,
    renderComponent,
    solicitation,
    categories,
    router: connectRouter(history)
})

export default rootReducer;