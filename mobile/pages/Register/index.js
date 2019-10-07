import React, { useState, useEffect, useRef } from 'react'
import TextInputMask from 'react-native-text-input-mask';
import superagent from 'superagent';
import Toast from 'react-native-easy-toast';
import {View, Image, KeyboardAvoidingView, Dimensions, Platform, ScrollView} from 'react-native'
import {Button, TextInput} from 'react-native-paper';
import { withNavigation } from 'react-navigation'
import styles from './styles'
import { useDispatch } from 'react-redux'
import BGImage from '../../assets/BGImage.png';
import SimpleHeaderLeft from '../../components/SimpleHeaderLeft';

const Register = ({ navigation }) => {
  let dispatch = useDispatch()
  const toast = useRef();
  const [user, setUser] = useState({name: 'Vinicius', email: 'vinicius_almeiddaa@hotmail.com', password: '1547852', cpf: '11111111111', address: 'rua lalala'})

  const onSave = () => {
    superagent
      .post('http://10.0.2.2:3001/api/user')
      .query({
        cpf: user.cpf,
        name: user.name,
        address: user.address,
        email: user.email,
        password: user.password,
        role: 2,
        mobile: 1
      })
      .then(res => {
        console.log(res)
        toast.current.show('Usuário cadastrado com sucesso!', 5000);
        dispatch({
          type: 'REGISTER',
          payload: {
            redirect: true,
            message: 'Cadastrado com sucesso!😃'
          }
        })
        setTimeout(() => {
          navigation.navigate('Login');         
        }, 5000);
      })
      .catch(err => {
        toast.current.show('Usuário com esse cpf ou email ja existente!', 5000);
        dispatch({
          type: 'REGISTER',
          payload: {
            redirect: false,
            message: 'Por favor, verifique os dados'
          }
        })
      })
  }

  return (
    <View style={styles.imageBG}>
      <Toast ref={toast} style={{backgroundColor: 'white'}} position='top' positionValue={10} fadeInDuration={750} fadeOutDuration={1000} opacity={0.8} textStyle={{color: 'black'}} />
      <Image source={BGImage} style={{ width: '100%', height: Dimensions.get( 'window' ).height, position: 'absolute' }} resizeMode="cover" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled={Platform.OS === 'ios'}>
        <SimpleHeaderLeft title="Voltar" onGoBack={() => navigation.goBack()} />
        <View style={styles.container}>
          <View style={styles.fieldsContainer}>
            <ScrollView contentContainerStyle={{ paddingBottom: 15 }}>
              <TextInput label='Nome' mode='outlined' value={user.name} style={styles.input} onChangeText={text => {setUser({...user, name: text })}} />
              <TextInput label='Email' mode='outlined' value={user.email} style={styles.input} onChangeText={text => {setUser({...user, email: text })}} />
              <TextInput secureTextEntry={true} label='Senha' mode='outlined' value={user.password} type='password' style={styles.input} onChangeText={text => {setUser({ ...user, password: text})}} />
              <TextInput label='Cpf' mode='outlined' value={user.cpf} style={styles.input} onChangeText={text => {setUser({...user, cpf: text })}}
                render={props => 
                  <TextInputMask 
                    {...props}
                    mask="[000].[000].[000]-[00]"
                  />
                }
              />
              <TextInput label='Endereço' mode='outlined' value={user.address} style={styles.input} onChangeText={text => {setUser({...user, address: text})}} />
              <Button onPress={onSave} mode="contained" style={styles.button}>Cadastrar</Button>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View >
  )
}

export default withNavigation(Register)
