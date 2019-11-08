import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import SimpleHeaderLeft from '../../../components/SimpleHeaderLeft';
import Toast from 'react-native-easy-toast';
import AsyncStorage from '@react-native-community/async-storage';
import superagent from 'superagent'
import { useSelector } from 'react-redux'

const Password = ({ navigation }) => {
  const toast = useRef();
  let user = useSelector((state) => state.UserReducer)
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [loading, setLoading] = useState(false);

  const onChangePassword = async () => {
		setLoading(true)
    if (password === '' || newPassword === '') return;
    else {
      const idUser = await AsyncStorage.getItem('idUser')
      const token = await AsyncStorage.getItem('userToken')
      try{
        const res = await superagent
        .put(`http://10.0.2.2:3001/api/user/${idUser}`)
        .set('Authorization', `Bearer ${token}`)
        .query({
          cpf: user.cpf, 
          name: user.name, 
          address: user.address, 
          email: user.email,
          password: password, 
          password_new: newPassword,
        })
        toast.current.show('Senha Alterada com sucesso!', 5000);
        setTimeout(() => {
          navigation.navigate('Home'); 
          setNewPassword('')
          setPassword('')
          setLoading(false)       
        }, 3000);
      }catch(e) {
        console.log(e)
        toast.current.show('Senha está errada, por favor verifique e tente novamente!', 5000);
      }
    }
    setLoading(false)
  }
  
  return (
    <View>
      <Toast ref={toast} style={{backgroundColor: 'white'}} position='top' positionValue={10} fadeInDuration={750} fadeOutDuration={1000} opacity={0.8} textStyle={{color: 'black'}} />
      <View style={styles.containerBack}>
        <SimpleHeaderLeft titleStyle={styles.fontSizeTitleBack} color="#7f8c8d" title="Voltar" onGoBack={() => navigation.goBack()} />
      </View>
      <View style={styles.containerTop}>
        <Text style={styles.textTop}>
          Alterar senha
          </Text>
      </View>
      <View>
        <TextInput
          label='Senha antiga'
          mode='outlined'
          value={password}
          style={styles.input}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          label='Nova senha'
          mode='outlined'
          value={newPassword}
          style={styles.input}
          onChangeText={text => setNewPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.containerButton}> 
        <Button
          mode="contained"
          style={styles.button}
          loading={loading}
          onPress={onChangePassword}
        >Alterar</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerBack: {
    marginLeft: 10,
    marginTop: 20
  },
  fontSizeTitleBack: {
    fontSize: 20
  },
  containerTop: {
    marginTop: 20,
    marginLeft: 30,
  },
  textTop: {
    fontSize: 20,
    fontWeight: '600'
  },
  input: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  containerButton:{
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    borderRadius: 20,
    width: 300,
  },
})

export default Password
