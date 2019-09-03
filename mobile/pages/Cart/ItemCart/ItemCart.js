import React, { useRef, useState } from 'react'
import { Text, View, Image, StyleSheet, ScrollView, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Button } from 'react-native-paper';

const ItemCart = ( { product, navigation } ) => {
    return (
        <View style={styles.containerPage}>
            <View style={styles.productCard}>
                <View style={styles.imagemProductCard}>
                    <Image
                        style={styles.imageCard}
                        source={require( '../../../assets/legumes_categorie.png' )}
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
                        <Text>{product.title}</Text>
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

const styles = StyleSheet.create( {
    containerPage: {
        marginBottom: 20
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
} );

export default ItemCart
