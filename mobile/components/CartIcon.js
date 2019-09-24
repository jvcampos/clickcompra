import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
export default CartIcon = ({name, badgeCount, color, size}) => {
  let cart = useSelector((state) => state.CartReducer)
  console.log(cart)
  const qtdeItems = _.sum(cart.map((item) => item.qtd));
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Icon name={name} size={size} color={color} />
      {cart.length > 0 && (
        <View style={styles.badgeIcon}>
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {qtdeItems}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badgeIcon: {
    position: 'absolute',
    right: -6,
    top: -12,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
