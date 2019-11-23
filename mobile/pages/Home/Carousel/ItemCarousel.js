import React, { useRef, useState, useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog';
import Button, { FAB } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'

const ItemCarousel = ( { item, id, navigation } ) => {
    const [ isModalVisible, setIsModalVisible ] = useState( false )
    const [ products, setProduct ] = useState( [] )

    useEffect( () => {
        setProduct( item )
    }, [] )

    const toogleModal = () => {
        setIsModalVisible( true )
    }

    // const products = [
    //     {
    //         index: 1,
    //         name: 'Produto 01',
    //         description: 'Descrição produto 01',
    //         value: 15
    //     },
    //     {
    //         index: 2,
    //         name: 'Produto 02',
    //         description: 'Descrição produto 02',
    //         value: 20
    //     },
    //     {
    //         index: 3,
    //         name: 'Produto 03',
    //         description: 'Descrição produto 03',
    //         value: 25
    //     },
    //     {
    //         index: 4,
    //         name: 'Produto 04',
    //         description: 'Descrição produto 04',
    //         value: 30
    //     },
    //     {
    //         index: 5,
    //         name: 'Produto 05',
    //         description: 'Descrição produto 05',
    //         value: 35
    //     },
    //     {
    //         index: 6,
    //         name: 'Produto 06',
    //         description: 'Descrição produto 06',
    //         value: 40
    //     },
    //     {
    //         index: 7,
    //         name: 'Produto 07',
    //         description: 'Descrição produto 07',
    //         value: 40
    //     }
    // ]

    return (
        <React.Fragment>
            <Dialog
                height={0.5}
                width={0.95}
                visible={isModalVisible}
                onTouchOutside={() => setIsModalVisible( false )}
                dialogTitle={
                    <DialogTitle title={item.title} />
                }
            >
                <DialogContent key={id}>

                    <View style={styles.productCard} key={id}>
                        {/* <View style={styles.imagemProductCard}>
                            <Image
                                style={styles.imageCard}
                                source={require( '../../../assets/drink_categorie.jpg' )}
                            />
                        </View> */}
                        <View style={styles.containerTextProductCard}>
                            <Text style={styles.textProductCard}>
                                {item.name_product}
                            </Text>
                            <Text>
                                {item.description}
                            </Text>
                            <Text style={styles.textPriceProduct}>
                                R$ {item.value}
                            </Text>
                        </View>
                        <View style={styles.buttonsRemoveProduct}>
                            <View>
                                <Icon name="minus-circle" size={25} color={'#e74c3c'} />
                            </View>
                        </View>
                        <View style={styles.qtdProduct}>
                            <View>
                                <Text style={styles.textQtdProduct}>0</Text>
                            </View>
                        </View>
                        <View style={styles.buttonsAddProduct}>
                            <View>
                                <Icon name="plus" size={25} color={'#2ecc71'} />
                            </View>
                        </View>
                    </View>
                </DialogContent>
            </Dialog>
            <TouchableOpacity onPress={toogleModal}>
                <View style={styles.carouselContainer}>
                    {/* <Image
                        style={styles.imageCarousel}
                        source={require( '../../../assets/beef_categorie.png' )}
                        resizeMode="cover"
                    /> */}
                    <Text>{item.title}</Text>
                </View >
            </TouchableOpacity>
        </React.Fragment>
    )
}

const styles = StyleSheet.create( {
    carouselContainer: {
        backgroundColor: '#rgb(164, 176, 190)',
        height: 150,
        marginTop: 30,
        marginBottom: -80,
        borderRadius: 20,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageCarousel: {
        width: 70,
        height: 70
    },
    imageCard: {
        alignSelf: 'center',
        width: 60,
        height: 60,
    },
    productCard: {
        borderBottomColor: '#rgb(164, 176, 190)',
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        height: 80,
        marginBottom: 10,
        backgroundColor: '#rgb(255, 255, 255)',
        borderRadius: 10,
        marginTop: 12,
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
        alignItems: 'flex-end'
    }
} );

export default ItemCarousel
