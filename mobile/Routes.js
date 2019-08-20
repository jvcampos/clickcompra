import React from 'react'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import Welcome from './pages/Welcome'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Product from './pages/Product'
import User from './pages/User'

const Tab = createBottomTabNavigator({
  Home,
  Product,
  User
},
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      inactiveTintColor: "#898989",
      activeTintColor: "#0177fd",
      style: {
        backgroundColor: "#f5f5f5"
      }
    }
  }
)

const Routes = createStackNavigator({
  Welcome,
  Register,
  Login,
  Tab
},
  {
    initialRouteName: "Welcome",
    headerMode: 'none'
  })

export default Routes