import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Text, View, StyleSheet, Image, FlatList, TouchableHighlight } from 'react-native'
import { addProduct, removeFromCart } from '../../../store/actions/cart';
import Icon from 'react-native-vector-icons/FontAwesome'

const ItemProduct = ({product, navigation}) => {
    const dispatch = useDispatch();
    const removeItem = (product) => {
        dispatch(removeFromCart( product ) );
    }

    const addItem = (product) => {
        dispatch(addProduct( product ) );
    }

    return (
        <View>
            <View style={styles.productCard}>
                <View style={styles.imagemProductCard}>
                    <Image
                        style={styles.imageCard}
                        source={{ uri: product?.imageBase64 }}
                    />
                </View>
                <View style={styles.containerTextProductCard}>
                    <Text style={styles.textProductCard}>
                        {product.name_product}
                    </Text>
                    <Text>
                        {product.description}
                    </Text>
                    <Text style={styles.textPriceProduct}>
                        R$ {product.value}
                    </Text>
                </View>
                <View style={styles.buttonsRemoveProduct}>
                    <View>
                        <Icon
                            onPress={() => removeItem( product )}
                            name="minus-circle"
                            size={25}
                            color={'#e74c3c'} />
                    </View>
                </View>
                <View style={styles.qtdProduct}>
                    <View>
                        <Text style={styles.textQtdProduct}>0</Text>
                    </View>
                </View>
                <View style={styles.buttonsAddProduct}>
                    <View>
                        <Icon
                            onPress={() => addItem( product )}
                            name="plus"
                            size={25}
                            color={'#2ecc71'} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create( {
    text: {
        fontSize: 30
    },
    imageCard: {
        alignSelf: 'center',
        width: '50%',
        height: '50%',
        marginLeft: 35
    },
    productCard: {
        borderBottomColor: '#rgb(164, 176, 190)',
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        height: 80,
        marginBottom: 10,
        backgroundColor: '#rgb(255, 255, 255)',
        borderRadius: 10,
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15
    },
    imagemProductCard: {
        justifyContent: 'center',
        width: 100,
        marginLeft: -35
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
    buttonsRemoveProduct: {
        flex: 1,
        width: 10,
        justifyContent: 'center',
        alignItems: 'flex-end'
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
    buttonsAddProduct: {
        flex: 1,
        width: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 10
    }
} )

export default ItemProduct
