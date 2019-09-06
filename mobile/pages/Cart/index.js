import React, { useRef, useState } from 'react'
import { Text, View, Image, StyleSheet, ScrollView, FlatList, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
var _ = require('lodash');
import { Button } from 'react-native-paper';

import ItemCart from './ItemCart/ItemCart'

const Cart = ({ navigation }) => {

    var {height, width} = Dimensions.get('window');
    let allProducts = useSelector((state) => state.CartReducer)

    return (
        <View style={styles.containerTopoTitle}>
            <Text style={styles.textTopoTitle}>Carrinho</Text>
            <ScrollView style={{ marginTop: 30 }}>
                <FlatList
                    maxHeight={height - 230}
                    data={allProducts}
                    renderItem={({ item }) => <ItemCart product={item} />}
                />
            </ScrollView>
            <View style={styles.containerBottom}>
                <View>
                    <Text style={styles.textContainerBottom}>Total: 
                        <Text style={{ color: '#e74c3c'}}> R$ 100,00</Text>
                    </Text>
                </View>
                <View style={styles.buttomBuy}>
                    <Button mode="contained">Finalizar lista</Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerTopoTitle: {
        marginLeft: 30,
        marginTop: 20
    },
    textTopoTitle: {
        fontSize: 20,
        fontWeight: '600'
    },
    containerBottom: {
        height: 100,
        marginRight: 20,
        // flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    textContainerBottom: {
        fontSize: 25,
        fontWeight: '600'
    },
    buttomBuy: {
        borderRadius: 20,
        width: '100%',
        marginBottom: 10
    }
});

export default Cart
