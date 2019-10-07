import React, { useState, useRef } from 'react'
import superagent from 'superagent'
import {View, ScrollView, KeyboardAvoidingView, Dimensions, Platform, Image, StyleSheet} from 'react-native'
import {Button, TextInput} from 'react-native-paper';
import { withNavigation } from 'react-navigation'
import BGImage from '../../assets/BGImage.png';
import SimpleHeaderLeft from '../../components/SimpleHeaderLeft';
import Toast from 'react-native-easy-toast';

const Login = ({ navigation }) => {
  const toastLogin = useRef();

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false);
  const recoverPassword = async () => {
    if(!email) return;
    setLoading(true)
    try {
      const res = await superagent
        .post('http://10.0.2.2:3001/api/forgotpassword')
        .query({
          email: email,
        })
      if(res.status === 200){
        toastLogin.current.show('Enviado com sucesso! Por favor verifique seu e-mail', 5000);
        setTimeout(() => {
          navigation.navigate('Login'); 
          setEmail('')
          setLoading(false)       
        }, 3000);
      }
    } catch (err) {
      toastLogin.current.show('Ocorreu um erro por favor tente mais tarde!', 5000);
      console.log(err)
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
                value={email}
                style={styles.input}
                onChangeText={text => {setEmail(text)}}
              />
              <View>
                <Button
                  onPress={recoverPassword}
                  mode="contained"
                  style={styles.button}
                  loading={loading}
                >
                  Recuperar Senha
                  </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  imageBG: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  input: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
    width: '50%',
    alignSelf: 'center'
  },
  image: {
    width: 230,
    height: 150,
    marginLeft: 73,
  },
  fieldsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    paddingBottom: 15,
  },
})

export default withNavigation(Login)
