import React, { useEffect } from 'react'
import { Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'

const User = ({ navigation }) => {
  const sair = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login')
    console.log(await AsyncStorage.getItem('userToken'))
  }

  console.log(navigation)

  return (
    <View>
      <View style={styles.containerNameUser}>
        <Text style={styles.textNameUser}>
          Nome do usuário
          </Text>
      </View>
      <View style={styles.containerCards}>
        <TouchableHighlight onPress={() => navigation.navigate('UserPersonal')}>
          <View style={styles.cardConfiguration}>
            <View style={styles.containerImageCard}>
              <Icon name="address-card" size={20} color={'#95afc0'} />
            </View>
            <View style={styles.containerTextCard}>
              <Text style={styles.textCard}>
                E-mail
          </Text>
            </View>
            <View style={styles.iconRight}>
              <View>
                <Icon name="arrow-right" size={20} color={'#7f8c8d'} />
              </View>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate('UserAddress')}>
          <View style={styles.cardConfiguration}>
            <View style={styles.containerImageCard}>
              <Icon name="map-marker" size={20} color={'#95afc0'} />
            </View>
            <View style={styles.containerTextCard}>
              <Text style={styles.textCard}>
                Endereço
          </Text>
            </View>
            <View style={styles.iconRight}>
              <View>
                <Icon name="arrow-right" size={20} color={'#7f8c8d'} />
              </View>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate('UserPassword')}>
          <View style={styles.cardConfiguration}>
            <View style={styles.containerImageCard}>
              <Icon name="lock" size={20} color={'#95afc0'} />
            </View>
            <View style={styles.containerTextCard}>
              <Text style={styles.textCard}>
                Alterar senha
          </Text>
            </View>
            <View style={styles.iconRight}>
              <View>
                <Icon name="arrow-right" size={20} color={'#7f8c8d'} />
              </View>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate('ListOfOrders')}>
          <View style={styles.cardConfiguration}>
            <View style={styles.containerImageCard}>
              <Icon name="list" size={20} color={'#95afc0'} />
            </View>
            <View style={styles.containerTextCard}>
              <Text style={styles.textCard}>
                Lista de Compras
              </Text>
            </View>
            <View style={styles.iconRight}>
              <View>
                <Icon name="arrow-right" size={20} color={'#7f8c8d'} />
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
      <TouchableHighlight onPress={() => sair()}>
        <View style={styles.cardConfiguration}>
          <View style={styles.containerImageCard}>
            <Icon name="power-off" size={20} color={'#95afc0'} />
          </View>
          <View style={styles.containerTextCard}>
            <Text style={styles.textCard}>
              Sair
          </Text>
          </View>
          <View style={styles.iconRight}>
            <View>
              <Icon name="arrow-right" size={20} color={'#7f8c8d'} />
            </View>
          </View>
        </View>
      </TouchableHighlight>
      {/* <Button mode='outlined' onPress={() => sair()}>
        Sair
      </Button> */}
    </View>
  )
}


const styles = StyleSheet.create({
  containerNameUser: {
    marginTop: 20,
    marginLeft: 30,
  },
  textNameUser: {
    fontSize: 20,
    fontWeight: '600'
  },
  containerCards: {
    marginTop: 50
  },
  cardConfiguration: {
    borderBottomColor: '#rgb(164, 176, 190)',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#rgb(255, 255, 255)',
    marginLeft: 10,
  },
  containerImageCard: {
    justifyContent: 'center',
    width: 50,
    marginLeft: 15
  },
  containerTextCard: {
    justifyContent: 'center',
  },
  textCard: {
    fontSize: 18,
    fontWeight: '700'
  },
  iconRight: {
    flex: 1,
    width: 10,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
})

export default User;
