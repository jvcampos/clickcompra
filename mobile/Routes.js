import { createStackNavigator } from 'react-navigation'

import Welcome from './pages/Welcome'
import Register from './pages/Register'
import Login from './pages/Login'

const Routes = createStackNavigator({
  Welcome: {
    screen: Welcome
  },
  Register: {
    screen: Register
  },
  Login: {
    screen: Login
  }
},
  {
    initialRouteName: "Welcome",
    headerMode: 'none'
  })

export default Routes