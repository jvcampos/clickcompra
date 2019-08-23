import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Inicio 🏡</Text>
    </View>
  )
}

export default Home