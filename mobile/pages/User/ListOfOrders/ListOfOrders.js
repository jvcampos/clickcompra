import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, RefreshControl } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import SimpleHeaderLeft from '../../../components/SimpleHeaderLeft';
import _ from 'lodash';
import superagent from 'superagent'
import Order from './Order';
import AsyncStorage from '@react-native-community/async-storage';

const Address = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, [])


  const fetchOrders = async () => {
    const idUser = await AsyncStorage.getItem('idUser')
    let orders = []
    await superagent
    .get(`http://10.0.2.2:3001/api/allOrders/${idUser}`) // aqui vai o id do usuário logado
    .then((resp) => {            
      const result = JSON.parse(resp.text)
      const groupedOrders = _.groupBy(result, 'id_compra');
      _.forEach(groupedOrders, (value, key) => {
        orders.push({key, title: value[0].created_at, status: value[0].status, data: value})
      })
      setOrders(orders)
    }).catch((e) => {
        console.log(e)
    })  
    setInterval(async() => { 
      const idUser = await AsyncStorage.getItem('idUser')
      let orders = []
      await superagent
      .get(`http://10.0.2.2:3001/api/allOrders/${idUser}`) // aqui vai o id do usuário logado
      .then((resp) => {            
        const result = JSON.parse(resp.text)
        const groupedOrders = _.groupBy(result, 'id_compra');
        _.forEach(groupedOrders, (value, key) => {
          orders.push({key, title: value[0].created_at, status: value[0].status, data: value, unityValue: value.unityValue})
        })
        setOrders(orders)
      }).catch((e) => {
          console.log(e)
      })  
  }, 3000);
  }

  console.log(orders)
  return (
    <ScrollView>
      <View>
        <View style={styles.containerBack}>
          <SimpleHeaderLeft titleStyle={styles.fontSizeTitleBack} color="#7f8c8d" title="Voltar" onGoBack={() => navigation.goBack()} />
        </View>
        <View style={styles.containerTop}>
          <Text style={styles.textTop}>
            Lista de Compras!
          </Text>
        </View>
          <FlatList data={orders} renderItem={({item, id}) => <Order key={id} order={item} />} />
      </View>
    </ScrollView>
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
