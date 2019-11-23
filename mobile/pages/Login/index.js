import React, { useState, useRef } from 'react'
import superagent from 'superagent'
import {View, ScrollView, KeyboardAvoidingView, Dimensions, Platform, Image, TouchableOpacity, Text} from 'react-native'
import {Button, TextInput} from 'react-native-paper';
import { withNavigation } from 'react-navigation'
import styles from './styles'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import BGImage from '../../assets/BGImage.png';
import SimpleHeaderLeft from '../../components/SimpleHeaderLeft';
import Toast from 'react-native-easy-toast';

const Login = ({ navigation }) => {
  let dispatch = useDispatch()
  const toastLogin = useRef();

  const [user, setUser] = useState({email: 'joao@outlook.com.br', password: '123'})
  const [loading, setLoading] = useState(false);
  const auth = async () => {
    if(!user.email || !user.password) return;
    setLoading(true)
    try {
      const res = await superagent
        .post('http://10.0.2.2:3001/api/login')
        .query({
          email: user.email,
          password: user.password,
        })
      if(res.status === 200){
        console.log(res)
        AsyncStorage.setItem('userToken', res.body.token.token)
        AsyncStorage.setItem('idUser', JSON.stringify(res.body.id))
        dispatch({
          type: 'LOGIN',
          payload: res.body.data
        })
        toastLogin.current.show('Bem-Vindo!', 5000);
        setTimeout(() => {
          navigation.navigate('Tab'); 
          setUser({name: '', email: ''})
          setLoading(false)       
        }, 3000);
      }
    } catch (err) {
      toastLogin.current.show('Ocorreu um erro por favor tente mais tarde!', 5000);
      console.log(err)
      dispatch({
        type: 'LOGIN',
        payload: {
          message: 'Erro ao fazer login'
        }
      })
      setLoading(false)
    }
  }

  return (
    <View style={styles.imageBG}>
      <Toast ref={toastLogin} style={{backgroundColor: 'white'}} position='top' positionValue={10} fadeInDuration={750} fadeOutDuration={1000} opacity={0.8} textStyle={{color: 'black'}} />
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
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={{textAlign: 'right', fontWeight: 'bold', fontSize: 15, padding: 5}}>Esqueci Minha Senha</Text>
                </TouchableOpacity>
                <Button
                  onPress={auth}
                  mode="contained"
                  style={styles.button}
                  loading={loading}
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
