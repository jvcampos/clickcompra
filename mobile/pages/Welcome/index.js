import React from 'react'
import {
  View,
  Image,
  Text
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { Button } from 'react-native-paper';
import styles from './styles'

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/clickCompra-300x150.png')}
        resizeMode="contain"
      />
      <View style={styles.buttons}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          Entrar
      </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          Cadastrar
      </Button>
      </View>
    </View>
  )
}

export default withNavigation(Welcome)