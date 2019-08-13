import React, { useState, useEffect } from 'react'
import {
  View,
  Text
} from 'react-native'
import { withNavigation } from 'react-navigation'
import styles from './styles'

const Home = ({ navigation }) => {
  return (
    <View style={styles.containerHome}>
        <Text>Olá hme page</Text>
    </View>
  )
}

export default withNavigation(Home)