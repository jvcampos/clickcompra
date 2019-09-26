import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import numeral from 'numeral';

export const SupermarketApproved = ({nameSupermarket, selectSupermarket, total}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => selectSupermarket()}>
      <View style={styles.nameSupermarket}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>{nameSupermarket.toUpperCase()}</Text>
      </View>
      <View style={styles.total}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>{numeral(total).format('$0,0.00')}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: '#rgb(164, 176, 190)',
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#rgb(255, 255, 255)',
    borderRadius: 10,
    marginTop: 15,
  },
  nameSupermarket: {
    justifyContent: 'center',
  },
  total: {
    justifyContent: 'center',
  }
})

export default SupermarketApproved;
