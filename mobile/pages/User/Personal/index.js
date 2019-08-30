import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import SimpleHeaderLeft from '../../../components/SimpleHeaderLeft';

const Personal = ({ navigation }) => {
  return (
    <View>
      <View style={styles.containerBack}>
        <SimpleHeaderLeft titleStyle={styles.fontSizeTitleBack} color="#7f8c8d" title="Voltar" onGoBack={() => navigation.goBack()} />
      </View>
      <View style={styles.containerTop}>
        <Text style={styles.textTop}>
        Alterar dados pessoais
          </Text>
      </View>
      <View>
        <TextInput
          label='E-mail'
          mode='outlined'
          // value={user.email}
          style={styles.input}
        // onChangeText={text => {
        //   setUser({
        //     ...user,
        //     email: text
        //   })
        // }}
        />
      </View>
      <View style={styles.containerButton}> 
        <Button
          mode="contained"
          style={styles.button}
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

export default Personal
