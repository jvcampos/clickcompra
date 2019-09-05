import React, { useRef, useState } from 'react'
import { Text, View, Image, StyleSheet, ScrollView, FlatList, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
var _ = require('lodash');
import { Button } from 'react-native-paper';

import ItemCart from './ItemCart/ItemCart'

const Cart = ({ navigation }) => {

    var {height, width} = Dimensions.get('window');
    console.log(height)

    const allProducts = [
        {
            key: 1,
            title: 'Produto 01',
            description: 'Descrição produto 01',
            value: 10,
            qtd: 2,
            valueTotal: 20
        },
        {
            key: 2,
            title: 'Produto 02',
            description: 'Descrição produto 02',
            value: 20,
            qtd: 1,
            valueTotal: 20
        },
        {
            key: 3,
            title: 'Produto 03',
            description: 'Descrição produto 03',
            value: 30,
            qtd: 1,
            valueTotal: 30
        },
        {
            key: 4,
            title: 'Produto 04',
            description: 'Descrição produto 04',
            value: 40,
            qtd: 1,
            valueTotal: 40
        },
    ]

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
