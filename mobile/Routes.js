import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import AuthLoading from './pages/AuthLoading'
import Welcome from './pages/Welcome'
import Register from './pages/Register'
import Login from './pages/Login'
import Home, { navigationOptions } from './pages/Home'
import Product from './pages/Product'
import User from './pages/User'
import Icon from 'react-native-vector-icons/FontAwesome'

const Tab = createMaterialBottomTabNavigator({
  Product: {
    screen: Product,
    navigationOptions: () => ({
      tabBarLabel: 'Produtos',
      tabBarIcon: ({ focused }) => (
        <Icon name="tag" size={25} color={focused ? '#000' : '#ddd'} />
      ),
    }),
  },
  Home: {
    screen: Home,
    navigationOptions: () => ({
      tabBarLabel: 'Inicio',
      tabBarIcon: ({ focused }) => (
        <Icon name="home" size={25} color={focused ? '#000' : '#ddd'} />
      ),
    }),
  },
  User: {
    screen: User,
    navigationOptions: () => ({
      tabBarLabel: 'Configurações',
      tabBarIcon: ({ focused }) => (
        <Icon name="cog" size={25} color={focused ? '#000' : '#ddd'} />
      ),
    }),
  }
},
  {
    initialRouteName: "Home",
    shifting: true,
    animationEnabled: true,
    swipeEnabled: true,
    barStyle: { backgroundColor: '#fff' },
  }
)

const Routes = createStackNavigator({
  AuthLoading,
  Welcome,
  Register,
  Login,
  Tab
},
  {
    initialRouteName: "Tab",
    headerMode: 'none'
  })

export default Routes
