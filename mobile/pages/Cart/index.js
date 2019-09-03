import React, { useRef, useState } from 'react'
import { Text, View, Image, StyleSheet, ScrollView, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Button } from 'react-native-paper';

const CartProduct = ( { product } ) => {
    return (
        <View style={{ marginBottom: 20 }}>
            <View style={styles.productCard}>
                <View style={styles.imagemProductCard}>
                    <Image
                        style={styles.imageCard}
                        source={require( '../../assets/legumes_categorie.png' )}
                    />
                </View>
                <View style={styles.containerTextProductCard}>
                    <Text style={styles.textProductCard}>
                        {product.description}
                    </Text>
                    <Text style={styles.textPriceProduct}>
                        R$ {product.value}
                    </Text>
                    <View style={styles.containerTotalQtd}>
                        <Text style={styles.textTotalQtd}>{product.qtd}</Text>
                    </View>
                    <View style={styles.containerNameProduct}>
                        <Text>{product.name}</Text>
                    </View>
                </View>
                <View style={styles.containerButtonAndValue}>
                    <View style={styles.buttonsRemoveProduct}>
                        <View>
                            <Icon name="trash" size={25} color={'#e74c3c'} />
                        </View>
                    </View>
                    <View style={styles.containerValueTotalProduct}>
                        <Text style={styles.textValueTotalProduct}>R$ {product.valueTotal}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const Cart = ( { navigation } ) => {

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
        {
            key: 5,
            title: 'Produto 05',
            description: 'Descrição produto 05',
            value: 50,
            qtd: 1,
            valueTotal: 40
        },
    ]

    return (
        <View style={styles.containerTopoTitle}>
            <Text style={styles.textTopoTitle}>Carrinho</Text>
            <ScrollView>
                <FlatList
                    maxHeight={500}
                    data={allProducts}
                    renderItem={( { item } ) => <CartProduct product={item} />}
                />
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start', paddingTop: 20 }}>
                <View>
                    <Button mode="contained">Comprar</Button>
                </View>
                <View>
                    <Text style={{ fontSize: 25, fontWeight: 'bold'}}>Valor: 100,00</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create( {
    containerTopoTitle: {
        marginLeft: 30,
        marginTop: 20
    },
    textTopoTitle: {
        fontSize: 20,
        fontWeight: '600'
    },
    productCard: {
        flexDirection: 'row',
        height: 160,
        marginBottom: 10,
        backgroundColor: '#rgb(255, 255, 255)',
        borderRadius: 10,
        marginTop: 12,
        marginRight: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0.8,
        elevation: 1,
    },
    imagemProductCard: {
        justifyContent: 'center',
        width: 80,
    },
    imageCard: {
        alignSelf: 'center',
        width: 50,
        height: 50,
    },
    containerTextProductCard: {
        justifyContent: 'center',
    },
    textProductCard: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    textPriceProduct: {
        color: '#e74c3c',
        fontWeight: "bold"
    },
    containerButtonAndValue: {
        justifyContent: 'flex-end',
        marginLeft: 30
    },
    buttonsRemoveProduct: {
        width: 25,
        marginLeft: 50,
        marginBottom: 30,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    qtdProduct: {
        flex: 1,
        width: 10,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    textQtdProduct: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    containerTotalQtd: {
        backgroundColor: '#ffeaa7',
        borderColor: '#dfe6e9',
        borderWidth: 0.5,
        borderRadius: 10,
        height: 30,
        width: 30,
        top: 30
    },
    textTotalQtd: {
        marginLeft: 10,
        marginTop: 5
    },
    containerNameProduct: {
        marginTop: 5,
        marginLeft: 40
    },
    containerValueTotalProduct: {
        marginLeft: 30,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'flex-end'
    },
    textValueTotalProduct: {
        fontSize: 18,
        fontWeight: '600',
        color: '#66ed8a'
    },
    containerBottom: {
        backgroundColor: '#FF9800',
    }
} );

export default Cart
