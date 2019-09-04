import React, { useRef, useState, useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import superagent from 'superagent';
import ItemCarousel from './Carousel/ItemCarousel'
import Categories from './Categories/Categories'
import { useDispatch } from 'react-redux';
import { allCategories } from '../../store/actions/categories';

const Home = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllCategories();
  }, [])

  const getAllCategories = async () => {
    await superagent
    .get('http://10.0.2.2:3333/api/categories').then((response) => {
      const categories = JSON.parse(response.text);
      setCategories(categories)
      dispatch(allCategories(categories));
    }).catch((e) => {
      console.log(e)
    })
  }
  const promotions = [
    {
      index: 1,
      title: "Promoção 01"
    },
    {
      index: 2,
      title: "Promoção 02"
    },
    {
      index: 3,
      title: "Promoção 03"
    }
  ]

  return (
    <View style={styles.containerPromotions}>
      <View>
        <Text style={styles.textPromotions}>Promoções</Text>
        <Carousel
          data={promotions}
          renderItem={({ item }) => <ItemCarousel item={item} />}
          sliderWidth={360}
          itemWidth={250}
        />
        <View style={styles.containerCategories}>
          <Text style={styles.textCategories}>Categorias</Text>
          <ScrollView>
            {categories.map((categorie, id) => {
              return <Categories key={id} item={categorie} />
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerPromotions: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 30,
    alignItems: 'flex-start',
  },
  textPromotions: {
    fontSize: 25
  },
  containerCategories: {
    flex: 3,
    marginTop: -15,
    marginBottom: 50
  },
  textCategories: {
    fontSize: 25,
    marginBottom: 15
  },
})

export default Home
