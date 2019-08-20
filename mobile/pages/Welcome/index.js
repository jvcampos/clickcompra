import React from 'react'
import {
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { Button } from 'react-native-paper';
import styles from './styles'

const Welcome = ({ navigation }) => (
  <View style={styles.container}>
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled={Platform.OS === 'ios'}>
      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        <View>
          <View>
            <Image
              style={styles.image}
              source={require('../../assets/clickCompra-300x150.png')}
              resizeMode="contain"
            />
          </View>
          <View>
            <View style={styles.buttons}>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
              >
                Entrar
              </Button>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => navigation.navigate('Register')}
              >
                Cadastrar
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </View>
)

export default withNavigation(Welcome)
