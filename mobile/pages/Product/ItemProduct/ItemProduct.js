import React, { useState, useEffect, useMemo } from 'react'
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, StyleSheet, Image } from 'react-native'
import { addProduct, removeFromCart } from '../../../store/actions/cart';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage';
import uuidv1 from 'uuid';

const ItemProduct = ({product, navigation}) => {
    const [qtdeProduct, setQtdeProduct] = useState(0)
    const dispatch = useDispatch();

    
    let allInTheCart = useSelector((state) => state.CartReducer)
    useEffect(() => {
        const qtdeProduct = allInTheCart.filter(itemCart => ( itemCart.id === product.id))
        setQtdeProduct(qtdeProduct.length)
    }, [allInTheCart]);
    const removeItem = (product) => {
        const lastProducFinded = _.findLast(allInTheCart, (n) => n.id === product.id)
        dispatch(removeFromCart(lastProducFinded));
    }
    const addItem = async (product) => {
        const idUser = await AsyncStorage.getItem('idUser')
        const idRandom = uuidv1();
        dispatch(addProduct({...product, idRandom, add: true, user_id: idUser}));
    }
    
    let cart = useSelector((state) => state.CartReducer)
    const findCartEqual = _.find(cart, ['product_id', product.id])

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
                    {/* <Text style={styles.textPriceProduct}>
                        R$ {product.value}
                    </Text> */}
                </View>
                <View style={styles.qtdProduct}>
                    <View>
                        <Text style={styles.textQtdProduct}>{findCartEqual?.qtd}</Text>
                    </View>
                </View>
                <View style={styles.buttonsAddProduct}>
                    <View>
                        <Icon
                            onPress={product.amount === findCartEqual?.qtd ? null : () => addItem(product)}
                            name="plus"
                            size={25}
                            color={product.amount === findCartEqual?.qtd ? 'grey' : '#2ecc71'} />
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
