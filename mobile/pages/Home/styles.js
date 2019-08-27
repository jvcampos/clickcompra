import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  containerPromotions: {
    flex: 2,
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 30,
    alignItems: 'flex-start'
  },
  containerCategories: {
    flex: 3,
  },
  categorieBox:{
    backgroundColor: '#bdc3c7',
    borderRadius: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 70,
    marginTop: 12
  },
  textCategorieBox:{
    fontSize: 20,
    marginLeft: 50
  },
  carouselContainer: {
    backgroundColor: '#3498db',
    height: 150,
    marginTop: 30,
    borderRadius: 20,
    fontSize: 17,
    // borderWidth: 1,
    // borderColor: '#ddd',
    // borderBottomWidth: 4,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.8,
    // elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPromotions: {
    fontSize: 25
  },
  textCategories: {
    fontSize: 25,
    marginBottom: 15
  },
})

export default styles