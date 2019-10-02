import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import SimpleHeaderLeft from '../../../components/SimpleHeaderLeft';
import _ from 'lodash';
import superagent from 'superagent'
import Order from './Order';

const Address = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders();
  }, [])

  const fetchOrders = async () => {
    let orders = []
    await superagent
    .get('http://10.0.2.2:3001/api/allOrders/1') // aqui vai o id do usuário logado
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
  }

  console.log(orders)
  return (
    <View>
      <View style={styles.containerBack}>
        <SimpleHeaderLeft titleStyle={styles.fontSizeTitleBack} color="#7f8c8d" title="Voltar" onGoBack={() => navigation.goBack()} />
      </View>
      <View style={styles.containerTop}>
        <Text style={styles.textTop}>
          Lista de Compras!
        </Text>
      </View>
      <ScrollView>
        <FlatList data={orders} renderItem={({item, id}) => <Order key={id} order={item} />} />
      </ScrollView>
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
