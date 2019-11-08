import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import SimpleHeaderLeft from '../../../components/SimpleHeaderLeft';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-easy-toast';
import superagent from 'superagent'

const Address = ({ navigation }) => {
  let user = useSelector((state) => state.UserReducer)
  const dispatch = useDispatch();
  const toast = useRef();
  const [address, setAddress] = useState(user.address)
  const [loading, setLoading] = useState(false);

  const onChangeAddress = async () => {
		setLoading(true)
    if (address === '') return;
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
          address: address, 
          email: user.email
        })
        dispatch({type: 'UPDATE_USER', payload: res.body.data})
        toast.current.show('Endereço alterado com sucesso!', 5000);
        setTimeout(() => {
          navigation.navigate('Home'); 
          setAddress('')
          setLoading(false)       
        }, 3000);
      }catch(e) {
        console.log(e)
        toast.current.show('Tente novamente mais tarde!', 5000);
      }
    }
    setLoading(false)
  }
  return (
    <View>
      <View style={styles.containerBack}>
        <Toast ref={toast} style={{backgroundColor: 'white'}} position='top' positionValue={10} fadeInDuration={750} fadeOutDuration={1000} opacity={0.8} textStyle={{color: 'black'}} />
        <SimpleHeaderLeft titleStyle={styles.fontSizeTitleBack} color="#7f8c8d" title="Voltar" onGoBack={() => navigation.goBack()} />
      </View>
      <View style={styles.containerTop}>
        <Text style={styles.textTop}>
          Alterar endereço
          </Text>
      </View>
      <View>
        <TextInput
          label='Endereço'
          mode='outlined'
          value={address}
          style={styles.input}
          onChangeText={text => {setAddress(text)}} //DANDO PROBLEMA COM O DEBUGGADOR NO CHROME
        />
      </View>
      <View style={styles.containerButton}> 
        <Button mode="contained" style={styles.button} onPress={onChangeAddress} loading={loading} >Alterar</Button>
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

export default Address
