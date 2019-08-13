import React from 'react'
import {
  View,
  Image,
  Text
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { Button } from 'react-native-paper';
import styles from './styles'

const Welcome = ({ navigation }) => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={require('../../assets/clickCompra-300x150.png')}
      resizeMode="contain"
    />
    <View>
      <Button mode="contained" style={styles.button}>
        Entrar
      </Button>
      <Button
        mode="contained"
        style={styles.buttonRegister}
        onPress={() => navigation.navigate('Register')}
      >
        Inscrever-se
      </Button>
    </View>
  </View>
)

export default withNavigation(Welcome)