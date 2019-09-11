import React, { useEffect, useState, useMemo } from 'react'
import { Text, View, Image, StyleSheet, ScrollView, FlatList, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {connect} from 'react-redux';
import { removeFromCart } from '../../store/actions/cart';
import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash';
import { Button } from 'react-native-paper';

import ItemCart from './ItemCart/ItemCart'

export const Cart = ({ navigation, allProducts, removeFromCart }) => {
    const [totalValue, setTotalValue] = useState(0)
    let {height, width} = Dimensions.get('window');

    const qtdeProduct = useMemo(() => allProducts && allProducts.map(itemCart => itemCart.value), [allProducts]);

    useEffect(() => {
        setTotalValue(_.sum(qtdeProduct));
    }, [qtdeProduct])
    
    const removeItem = (product) => {
        removeFromCart(product);
    };
    
    return (
        <View style={styles.containerTopoTitle}>
            <Text style={styles.textTopoTitle}>Carrinho</Text>
            <ScrollView style={{ marginTop: 30 }}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    maxHeight={height - 230}
                    data={allProducts}
                    renderItem={({ item, id }) => <ItemCart key={parseFloat(id)} product={item} removeItem={() => removeItem(item)} />}
                />
            </ScrollView>
            <View style={styles.containerBottom}>
                <View>
                    <Text style={styles.textContainerBottom}>Total: 
                        <Text style={{ color: '#e74c3c'}}> R$ {totalValue}</Text>
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

const mapStateToProps = state => {
    return {
        allProducts: state.CartReducer
    }
}
const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: (product) => dispatch(removeFromCart(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
