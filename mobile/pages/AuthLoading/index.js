import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { View, ActivityIndicator } from 'react-native'

export default function AuthLoading({ navigation }) {
  useEffect(() => {
    start()
  }, [])

  const start = async () => {
    console.log("Loading: ", await AsyncStorage.getItem('userToken'))
    const userToken = await AsyncStorage.getItem('userToken');
    await navigation.navigate(userToken ? 'Tab' : 'Welcome');
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  )
}