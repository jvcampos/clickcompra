import React, { useRef } from 'react'
import { Text, View, Image, ScrollView } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import styles from './styles'

const carouselPromotions = (item) => {
  return (
    <View style={styles.carouselContainer}>
      <Image
        style={styles.imageCarousel}
        source={require('../../assets/beef_categorie.png')}
        resizeMode="cover"
      />
      <Text>{item.title}</Text>
    </View>
  )
}

const cardCategorie = (categorie) => {
  return (
    <View style={styles.categorieBox}>
      <View style={styles.imagemCategorieBox}>
        <Image
          style={styles.imageCard}
          source={require('../../assets/beef_categorie.png')}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.containerTextCategorieBox}>
        <Text style={styles.textCategoriesBox}>
          {categorie.title}
        </Text>
      </View>
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
          renderItem={({ item }) => carouselPromotions(item)}
          sliderWidth={360}
          itemWidth={250}
        />
        <View style={styles.containerCategories}>
          <Text style={styles.textCategories}>Categorias</Text>
          <ScrollView>
            {categories.map(categorie => {
              return cardCategorie(categorie)
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

export default Home