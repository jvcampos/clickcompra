import React, { useState, useEffect } from 'react'
import {
  View,
  Text
} from 'react-native'
import {
  Button,
  TextInput
} from 'react-native-paper';
import { withNavigation, StackActions, NavigationActions } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../store/actions/user'
import AsyncStorage from '@react-native-community/async-storage';

const Login = ({ navigation }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  let dispatch = useDispatch()
  let UserReducer = useSelector(
    (state) => state.UserReducer
  )
  const tokenUser = async () => {
    return await AsyncStorage.getItem('@ClickCompra:token')
  }
  const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Tab', params: { token: tokenUser } }),
    ],
  })
  UserReducer.login && navigation.dispatch(resetAction)

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraHeight={150}
      enableResetScrollToCoords={false}
    >
      <TextInput
        label='Email'
        mode='outlined'
        value={user.email}
        style={styles.input}
        onChangeText={text => {
          setUser({
            ...user,
            email: text
          })
        }}
      />
      <TextInput
        secureTextEntry={true}
        label='Senha'
        mode='outlined'
        value={user.password}
        type='password'
        style={styles.input}
        onChangeText={text => {
          setUser({
            ...user,
            password: text
          })
        }}
      />
      <View>
        <Button
          onPress={() => dispatch(login(user))}
          mode="contained"
          style={styles.button}
        >
          Entrar
          </Button>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default withNavigation(Login)