import React, { useRef, useState } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

const Categories = ({ item, navigation }) => {

    const onPressButton = (item) => {
        console.log("click : " + item.title);
    }

    return (
        <View style={styles.categorieBox}>
            <View style={styles.imagemCategorieBox}>
                <Image
                    style={styles.imageCard}
                    source={require('../../../assets/beef_categorie.png')}
                    resizeMode="stretch"
                />
            </View>
            <View style={styles.containerTextCategorieBox}>
                <Text style={styles.textCategoriesBox}>
                    {item.title}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    categorieBox: {
        flexDirection: 'row',
        height: 80,
        marginBottom: 10,
        backgroundColor: '#rgb(255, 255, 255)',
        borderRadius: 10,
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        elevation: 1,
    },
    imagemCategorieBox: {
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderWidth: 0.2,
        borderRadius: 5,
    },
    imageCard: {
        alignSelf: 'center',
        width: 50,
        height: 50,
    },
    containerTextCategorieBox: {
        justifyContent: 'center',
        marginLeft: 50
    },
    textCategoriesBox: {
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default Categories