import { createStackNavigator } from 'react-navigation'

import Welcome from './pages/Welcome'
import Register from './pages/Register'

const Routes = createStackNavigator({
  Welcome: {
    screen: Welcome
  },
  Register: {
    screen: Register
  }
},
  {
    initialRouteName: "Welcome",
    headerMode: 'none'
  })

export default Routes