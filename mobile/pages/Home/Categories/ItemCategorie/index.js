import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import superagent from 'superagent';
import SimpleHeaderLeft from '../../../../components/SimpleHeaderLeft';
import { allProducts } from '../../../../store/actions/products';
import ItemProduct from '../../../Product/ItemProduct/ItemProduct'
import _ from 'lodash';
const ItemCategorie = ({ navigation }) => {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    await superagent
      .get(`http://10.0.2.2:3001/api/product/${navigation.state.params.item.id}`).then((response) => {
        
        const products = JSON.parse(response.text);
        setProducts(_.uniqBy(products.data, 'name_product'))
        dispatch(allProducts(products.data));
      }).catch((e) => {
        console.log(e)
      })
  }

  return (
    <View>
      <View style={styles.containerBack}>
        <SimpleHeaderLeft titleStyle={styles.fontSizeTitleBack} color="#7f8c8d" title="Voltar" onGoBack={() => navigation.goBack()} />
        <ScrollView>
          {products.map((product, id) => {
            return <ItemProduct key={id} product={product} />
          })}
        </ScrollView>
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
})

export default ItemCategorie
