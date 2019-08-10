import React, { useState } from 'react'
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

const Register = ({ navigation }) => (
  <KeyboardAwareScrollView>
    <TextInput
      label='Nome'
      mode='outlined'
      style={styles.input}
    />
    <TextInput
      label='Email'
      mode='outlined'
      style={styles.input}
    />
    <TextInput
      label='Senha'
      mode='outlined'
      style={styles.input}
    />
    <TextInput
      label='Cpf'
      mode='outlined'
      style={styles.input}
    />
    <TextInput
      label='Endereço'
      mode='outlined'
      style={styles.input}
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

export default withNavigation(Register)