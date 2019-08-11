import React, { useState, useEffect } from 'react'
import {
  View,
  Text
} from 'react-native'
import {
  Button,
  TextInput
} from 'react-native-paper';
import { withNavigation } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import { useDispatch } from 'react-redux'
import { createUser } from '../../store/actions/user'

const Register = ({ navigation }) => {
  const [user, setUser] = useState({
    name: 'mobile',
    email: 'mobile@mobile.com',
    password: '123',
    cpf: '57894563285',
    address: 'rua mobile'
  })
  let dispatch = useDispatch()

  return (
    <KeyboardAwareScrollView>
      <TextInput
        label='Nome'
        mode='outlined'
        value={user.name}
        style={styles.input}
        onChangeText={text => {
          setUser({
             ...user,
             name: text 
            })
        }}
      />
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
      <TextInput
        label='Cpf'
        mode='outlined'
        value={user.cpf}
        style={styles.input}
        onChangeText={text => {
          setUser({
             ...user,
             cpf: text 
            })
        }}
      />
      <TextInput
        label='Endereço'
        mode='outlined'
        value={user.address}
        style={styles.input}
        onChangeText={text => {
          setUser({
             ...user,
             address: text 
            })
        }}
      />
      <View style={styles.container}>
        <Button
          onPress={() => dispatch(createUser(user))}
          mode="contained"
          style={styles.button}
        >
          Cadastrar
    </Button>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default withNavigation(Register)