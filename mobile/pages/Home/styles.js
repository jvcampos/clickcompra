import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  /* Promoções */ 
  containerPromotions: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 30,
    alignItems: 'flex-start',
  },
  carouselContainer: {
    backgroundColor: '#rgb(164, 176, 190)',
    height: 150,
    marginTop: 30,
    marginBottom: -80,
    borderRadius: 20,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPromotions: {
    fontSize: 25
  },
  imageCarousel: {
    width: 70,
    height: 70
  },

  /* Categorias */
  containerCategories: {
    flex: 3,
    marginTop: -15,
    marginBottom: 50
  },
  categorieBox:{
    flexDirection: 'row',
    height: 80,
    marginBottom: 10,
    backgroundColor: '#rgb(255, 255, 255)',
    borderRadius: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    elevation: 1,
  },
  imageCard:{
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  imagemCategorieBox:{
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderWidth: 0.2,
    borderRadius: 5,
  },
  containerTextCategorieBox:{
    justifyContent: 'center',
    marginLeft: 50
  },
  textCategoriesBox:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  textCategories: {
    fontSize: 25,
    marginBottom: 15
  },
})

export default styles