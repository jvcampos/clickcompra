import React from 'react'
import {
  View,
  Image,
  Text
} from 'react-native'
import { Button } from 'react-native-paper';
import styles from './styles'

export default Welcome = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/clickCompra-300x150.png')}
        resizeMode="contain"
      />
      <View style={styles.buttons}>
        <Button mode="contained" style={styles.button}>
          Entrar
      </Button>
        <Button mode="contained" style={styles.button}>
          Cadatrar
      </Button>
      </View>
    </View>
  )
}