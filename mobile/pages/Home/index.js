import React, { useRef, useState } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import Carousel from 'react-native-snap-carousel';

import ItemCarousel from './Carousel/ItemCarousel'
import Categories from './Categories/Categories'

const Home = ({ navigation }) => {
  const promotions = [
    {
      index: 1,
      title: "Categoria 01"
    },
    {
      index: 2,
      title: "Categoria 02"
    },
    {
      index: 3,
      title: "Categoria 03"
    }
  ]

  const categories = [
    {
      index: 1,
      title: "Carne"
    },
    {
      index: 2,
      title: "Legumes"
    },
    {
      index: 3,
      title: "Bebidas"
    },
    {
      index: 3,
      title: "Grãos"
    }
  ];

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
            {categories.map(categorie => {
              return <Categories item={categorie} />
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