import React from 'react'
import _ from 'lodash';
import { Text, View, Image, StyleSheet  } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux';

import { Button } from 'react-native-paper';

export const ItemCart = ({ product, removeItem }) => {
   
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
                    <View style={styles.containerNameProduct}>
                        <Text>{product.name_product}</Text>
                    </View>
                </View>
                <View style={styles.containerButtonAndValue}>
                    <View style={styles.buttonsRemoveProduct}>
                        <View>
                            <Icon name="trash" size={25} color={'#e74c3c'} onPress={() => removeItem()} />
                        </View>
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
        marginTop: 45,
    },
} );

function mapStateToProps(state) {
    return {
        allProducts: state.CartReducer
    }
}

export default connect(mapStateToProps)(ItemCart)
