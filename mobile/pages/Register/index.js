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

const Register = ({ navigation }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    cpf: '',
    address: ''
  })

  return (
  <KeyboardAwareScrollView>
    <TextInput
      label='Nome'
      mode='outlined'
      value={user.name}
      style={styles.input}
      onChangeText={text => {
        setUser({name: text})
      }}
    />
    <TextInput
      label='Email'
      mode='outlined'
      style={styles.input}
      onChangeText={text => {
        setUser({email: text})
      }}
    />
    <TextInput
      secureTextEntry={true}
      label='Senha'
      mode='outlined'
      type='password'
      style={styles.input}
      onChangeText={text => {
        setUser({password: text})
      }}
    />
    <TextInput
      label='Cpf'
      mode='outlined'
      style={styles.input}
      onChangeText={text => {
        setUser({cpf: text})
      }}
    />
    <TextInput
      label='Endereço'
      mode='outlined'
      style={styles.input}
      onChangeText={text => {
        setUser({address: text})
      }}
    />
    <View style={styles.container}>
      <Button
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