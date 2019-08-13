import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
} from 'react-native'
import {
  Button,
  TextInput
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    <View style={styles.containerInputs}>
      <View style={styles.containerTop}>
        <Icon name="search" size={30} color="#900"></Icon>
        <Text
          style={styles.text}
          onPress={() => navigation.navigate("Welcome")}>
          VOLTAR</Text>
      </View>
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
        <View style={styles.containerButton}>
          <Button
            onPress={() => dispatch(createUser(user))}
            mode="contained"
            style={styles.button}
          >
            Inscrever-se
    </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default withNavigation(Register)