import React, { useEffect } from 'react'
import { Text } from 'react-native'
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

export default function User({ navigation }) {
  const sair = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login')
    console.log(await AsyncStorage.getItem('userToken'))
  }

  return (
    <Button onPress={() => sair()}>
      Sair
    </Button>
  )
}
