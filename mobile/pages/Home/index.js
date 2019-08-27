import React, { useRef } from 'react'
import { Text, View } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import styles from './styles'

const carouselPromotions = (item) => {
  return (
    <View style={styles.carouselContainer}>
      <Text>{item.title}</Text>
    </View>
  )
}

const Home = ({ navigation }) => {
  const promotions = [
    {
      index: 1,
      title: "Categoria 01"
    },
    {
      index: 2,
      title: "Categoria 02"
    }
  ]

  return (
    <View style={styles.containerPromotions}>
      <View>
        <Text style={styles.textPromotions}>Promoções</Text>
        <Carousel
          data={promotions}
          renderItem={({ item }) => carouselPromotions(item)}
          sliderWidth={360}
          itemWidth={250}
        />
        <View style={styles.containerCategories}>
          <Text style={styles.textCategories}>Categorias</Text>
          <View style={styles.categorieBox}>
            <Text style={styles.textCategorieBox}>
              Carne
            </Text>
          </View>
          <View style={styles.categorieBox}>
            <Text style={styles.textCategorieBox}>
              Carne
            </Text>
          </View>
          <View style={styles.categorieBox}>
            <Text style={styles.textCategorieBox}>
              Carne
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Home