import React, { useState, useEffect } from 'react'
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  Image
} from 'react-native'
import {
  Button,
  TextInput
} from 'react-native-paper';
import { withNavigation, StackActions, NavigationActions } from 'react-navigation'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/actions/user'
import AsyncStorage from '@react-native-community/async-storage';
import BGImage from '../../assets/BGImage.png';
import SimpleHeaderLeft from '../../components/SimpleHeaderLeft';

const Login = ({ navigation }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  let dispatch = useDispatch()
  let UserReducer = useSelector(
    (state) => state.UserReducer
  )
  const auth = async () => {
    await dispatch(login(user))
    const token = await AsyncStorage.getItem('userToken')
    console.log(token)
    if(token){
      navigation.navigate('Tab', {token: token})
    }
  }

  return (
    <View style={styles.imageBG}>
      <Image source={BGImage} style={{width: '100%', height: Dimensions.get('window').height, position: 'absolute'}} resizeMode="cover" />
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled={Platform.OS === 'ios'}>
      <SimpleHeaderLeft title="Voltar" onGoBack={() => navigation.goBack()} />
        <ScrollView contentContainerStyle={{paddingBottom: 30}}>
          <View style={styles.container}>
            <View style={styles.fieldsContainer}>
              <View style={{textAlign: 'center'}}>
                <Image
                  style={styles.image}
                  source={require('../../assets/clickCompra-300x150.png')}
                  resizeMode="contain"
                />
              </View>
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
              <View>
                <Button
                  onPress={() => auth()}
                  mode="contained"
                  style={styles.button}
                >
                  Entrar
                  </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default withNavigation(Login)
