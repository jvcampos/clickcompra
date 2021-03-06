import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import CartIcon from './components/CartIcon';
import AuthLoading from './pages/AuthLoading'
import Welcome from './pages/Welcome'
import Register from './pages/Register'
import Login from './pages/Login'
import Home, { navigationOptions } from './pages/Home'
import Cart from './pages/Cart'
import Categorie from './pages/Home/index'
import Product from './pages/Product'
import User from './pages/User'
import UserAddress from './pages/User/Address'
import UserPassword from './pages/User/Password'
import UserPersonal from  './pages/User/Personal'
import ItemCategorie from './pages/Home/Categories/ItemCategorie'
import ListOfOrders from './pages/User/ListOfOrders/ListOfOrders';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

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
  Cart: {
    screen: Cart,
    navigationOptions: () => ({
      tabBarLabel: 'Carrinho',
      tabBarIcon: ({ focused }) => (
        <CartIcon name="shopping-cart" size={25} badgeCount={15} color={focused ? '#000' : '#ddd'} />
      ),
    }),
  },
  User: {
    screen: User,
    navigationOptions: () => ({
      tabBarLabel: 'Perfil',
      tabBarIcon: ({ focused }) => (
        <Icon name="user" size={25} color={focused ? '#000' : '#ddd'} />
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
  ListOfOrders,
  Register,
  Login,
  UserAddress,
  UserPassword,
  UserPersonal,
  ItemCategorie,
  Categorie,
  Tab,
  ForgotPassword
},
  {
    initialRouteName: "Welcome",
    headerMode: 'none'
  })

export default Routes
