import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper'

const Product = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        // onChangeText={}
        // value={firstQuery}
      />
      <View>
        
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
  text: {
    fontSize: 30
  }
})

export default Product
