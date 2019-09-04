import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Text, View, StyleSheet, Image, FlatList } from 'react-native'
import { allProducts } from '../../store/actions/products'
import { Searchbar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import superagent from 'superagent';

const Product = ({ navigation }) => {
  let dispatch = useDispatch()

  const [products, setProducts] = useState([]);
  const [base64, setBase64] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, [])

  const getAllProducts = async () => {
    await superagent
      .get('http://10.0.2.2:3001/api/products').then(response => {
        const product = JSON.parse(response.text);
        // const base64Icon = product
        console.log(product)
        setProducts(product)
        dispatch(allProducts(products));
        console.log(products)
      }).catch(e => {
        console.log(e)
      })
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
      // onChangeText={}
      // value={firstQuery}
      />
      <View style={styles.containerList}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <View style={styles.imagemProductCard}>
                <Image
                  style={styles.imageCard}
                  source={{ uri: item.imageBase64 }}
                />
              </View>
              <View style={styles.containerTextProductCard}>
                <Text style={styles.textProductCard}>
                  {item.name_product}
            </Text>
                <Text>
                  {item.description}
            </Text>
                <Text style={styles.textPriceProduct}>
                  R$ {item.value}
            </Text>
              </View>
              <View style={styles.buttonsRemoveProduct}>
                <View>
                  <Icon name="minus-circle" size={25} color={'#e74c3c'} />
                </View>
              </View>
              <View style={styles.qtdProduct}>
                <View>
                  <Text style={styles.textQtdProduct}>0</Text>
                </View>
              </View>
              <View style={styles.buttonsAddProduct}>
                <View>
                  <Icon name="plus" size={25} color={'#2ecc71'} />
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  containerList: {
    marginBottom: 70
  },
  text: {
    fontSize: 30
  },
  imageCard: {
    alignSelf: 'center',
    width: '50%',
    height: '50%',
    marginLeft: 35
  },
  productCard: {
    borderBottomColor: '#rgb(164, 176, 190)',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    height: 80,
    marginBottom: 10,
    backgroundColor: '#rgb(255, 255, 255)',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15
  },
  imagemProductCard: {
    justifyContent: 'center',
    width: 100,
    marginLeft: -35
  },
  containerTextProductCard: {
    justifyContent: 'center',
  },
  textProductCard: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  textPriceProduct: {
    color: '#e74c3c',
    fontWeight: "bold"
  },
  buttonsRemoveProduct: {
    flex: 1,
    width: 10,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  qtdProduct: {
    flex: 1,
    width: 10,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  textQtdProduct: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  buttonsAddProduct: {
    flex: 1,
    width: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10
  }
})

export default Product
