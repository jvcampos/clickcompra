import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, Image, FlatList, SafeAreaView, RefreshControl, ScrollView } from 'react-native'
import { allProducts } from '../../store/actions/products'
import { Searchbar } from 'react-native-paper'
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome'
import superagent from 'superagent';

import ItemProduct from './ItemProduct/ItemProduct'

const Product = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  let dispatch = useDispatch()

  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focusSearch, setFocusSearch] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, [])

  const onRefresh = useCallback(async() => {
    setRefreshing(true);
    await superagent
    .get('http://10.0.2.2:3001/api/products').then(response => {
      const products = JSON.parse(response.text);
      setProducts(products)
      dispatch(allProducts(products));
      setRefreshing(false)
    }).catch(e => {
      console.log(e)
      setRefreshing(false);
    })
  }, [refreshing]);

  const getAllProducts = async () => {
    await superagent
      .get('http://10.0.2.2:3001/api/products').then(response => {
        const products = JSON.parse(response.text);
        setProducts(products)
        dispatch(allProducts(products));
      }).catch(e => {
        console.log(e)
      })
  }

  let ProductReducer = useSelector(
    (state) => state.ProductReducer
  )

  const onChangeSearch = (text) => {
    if (text === '') {
      setFocusSearch(false)
      setProducts(...ProductReducer)
    } else {
      setFocusSearch(true)
      const filterResult = _.filter(products, (product) => {
        return _.includes(product.name_product, text)
      })
      setProductsFiltered(filterResult)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Procurar produto"
        onChangeText={text => onChangeSearch(text)}
      />
      <ScrollView contentContainerStyle={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.containerList}>
          {focusSearch ? <FlatList data={productsFiltered} keyExtractor={(item, index) => index.toString()} renderItem={({item, id}) => <ItemProduct key={parseFloat(id)} product={item} /> } />
          :
            <FlatList data={products} keyExtractor={(item, index) => index.toString()} renderItem={({item, id}) => <ItemProduct key={parseFloat(id)} product={item} />} />
          }
      </View>
      </ScrollView>
    </SafeAreaView>
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
})

export default Product
