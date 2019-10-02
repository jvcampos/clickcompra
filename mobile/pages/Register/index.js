import React, { useState, useEffect } from 'react'
import TextInputMask from 'react-native-text-input-mask';
import {
  View,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native'
import {
  Button,
  TextInput
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation'
import styles from './styles'
import { useDispatch } from 'react-redux'
import { createUser } from '../../store/actions/user'
import BGImage from '../../assets/BGImage.png';
import SimpleHeaderLeft from '../../components/SimpleHeaderLeft';

const Register = ({ navigation }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    cpf: '',
    address: ''
  })
  let dispatch = useDispatch()

  return (
    <View style={styles.imageBG}>
      <Image source={BGImage} style={{ width: '100%', height: Dimensions.get( 'window' ).height, position: 'absolute' }} resizeMode="cover" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled={Platform.OS === 'ios'}>
        <SimpleHeaderLeft title="Voltar" onGoBack={() => navigation.goBack()} />
        <View style={styles.container}>
          <View style={styles.fieldsContainer}>
            <ScrollView contentContainerStyle={{ paddingBottom: 15 }}>
              <TextInput label='Nome' mode='outlined' value={user.name} style={styles.input} onChangeText={text => { setUser( { ...user, name: text } ) }} />
              <TextInput label='Email' mode='outlined' value={user.email} style={styles.input} onChangeText={text => { setUser( { ...user, email: text } ) }} />
              <TextInput secureTextEntry={true} label='Senha' mode='outlined' value={user.password} type='password' style={styles.input} onChangeText={text => { setUser( { ...user, password: text } ) }} />
              <TextInput label='Cpf' mode='outlined' value={user.cpf} style={styles.input} onChangeText={text => { setUser( { ...user, cpf: text } ) }} 
                render={props => 
                  <TextInputMask 
                    {...props}
                    mask="[000].[000].[000]-[00]"
                  />
                }
              />
              <TextInput label='Endereço' mode='outlined' value={user.address} style={styles.input} onChangeText={text => { setUser( { ...user, address: text } ) }} />
              <Button onPress={() => dispatch( createUser( user ) )} mode="contained" style={styles.button}>Cadastrar</Button>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View >
  )
}

export default withNavigation( Register )
