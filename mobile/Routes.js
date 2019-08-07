import { createStackNavigator } from 'react-navigation'

import Welcome from './pages/Welcome'

const Routes = createStackNavigator({
  Welcome
},
  {
    headerMode: 'none'
  })

export default Routes