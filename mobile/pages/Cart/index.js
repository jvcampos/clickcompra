import React, { useEffect, useState, useMemo } from 'react'
import { Text, View, Image, StyleSheet, ScrollView, FlatList, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import {connect} from 'react-redux';
import { removeFromCart } from '../../store/actions/cart';
import _ from 'lodash';
import { Button } from 'react-native-paper';
import superagent from 'superagent'
import BestSupermarketsPopup from '../Cart/BestSupermarketsPopup';
import AsyncStorage from '@react-native-community/async-storage';

import ItemCart from './ItemCart/ItemCart'

export const Cart = ({ navigation, allProducts, removeFromCart }) => {
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const [supermarketsList, setSupermarketList] = useState([]);
    const [allSupermarkets, setAllSupermarket] = useState([]);
    const [idUser, setIdUser] = useState(null)

    const [totalValue, setTotalValue] = useState(0);
    let {height, width} = Dimensions.get('window');
    let cart = useSelector((state) => state.CartReducer)

    useEffect(() => {
        getAllSupermarkets();
    }, [])
    
    const getAllSupermarkets = async () => {
        await superagent
        .get('http://10.0.2.2:3001/api/supermarketsMobile')
        .then((resp) => {            
            const result = JSON.parse(resp.text)
            setAllSupermarket(result)
        }).catch((e) => {
            console.log(e)
        })
        const idUser = await AsyncStorage.getItem('idUser')
        setIdUser(idUser)
        console.log(await AsyncStorage.getItem('userToken'))
        console.log(idUser)
    }
    useEffect(() => {
        setTotalValue(_.sum(qtdeProduct));
    }, [qtdeProduct])

    const qtdeProduct = useMemo(() => allProducts && allProducts.map(itemCart => itemCart.value), [allProducts]);
    
    const removeItem = (product) => {
        removeFromCart(product);
    };
    const betterSupermarket = async () => {
        await superagent
        .post(`http://10.0.2.2:3001/api/cart/bestsupermarkets/${idUser}`) // aqui o id vai ser de quem estiver logado
        .then((resp) => {            
            const result = JSON.parse(resp.text)
            setSupermarketList(result)
            setIsModalVisible(true)
        }).catch((e) => {
          console.log(e)
        })
    }

    const closePopUp = () => setIsModalVisible(false);
    if(_.isEmpty(allProducts)) return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Image source={require('../../assets/emptyCart.png')} style={{width: 200, height: 200}} /></View>
    return (
        <React.Fragment>
        {supermarketsList && <BestSupermarketsPopup navigation={navigation} supermarketsSelecteds={supermarketsList} clickedOutside={() => setIsModalVisible(false)} isModalVisible={isModalVisible} supermarkets={allSupermarkets} closePopUp={closePopUp} />}
        <View style={styles.containerTopoTitle}>
        {_.isEmpty(allProducts) && <View style={{flex: 1}}><Image source={require('../../assets/emptyCart.png')} style={{width: '50%', height: '60%'}} /></View>}
            <Text style={styles.textTopoTitle}>Carrinho</Text>
            <ScrollView style={{ marginTop: 30 }}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    maxHeight={height - 230}
                    data={allProducts}
                    renderItem={({ item, id }) => <ItemCart key={parseFloat(id)} product={item} removeItem={() => removeItem(item)} />}
                    />
            </ScrollView>
            {allProducts.length > 0 &&
                <View style={styles.containerBottom}>
                    <View style={styles.buttomBuy}>
                        <Button mode="contained" onPress={betterSupermarket}>Finalizar lista</Button>
                    </View>
                </View>
            }
        </View>
    </React.Fragment>
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
