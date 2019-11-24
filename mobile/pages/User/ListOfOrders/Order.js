import React, {useState} from 'react'
import Moment from 'moment';
import { TouchableOpacity, Text, StyleSheet} from 'react-native'
import AllProductsFromOrder from './AllProductsFromOrder';
import _ from 'lodash';

const Order = ({order}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  Moment.locale('pt-br');
  
  const showProduct = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
  console.log(order.data)
  return (
    <React.Fragment>
      <AllProductsFromOrder totalValue={_.sum(_.map(order.data, (item) => item.qtde * item.unityValue))} products={order.data} isModalVisible={isModalVisible} clickedOutside={closeModal} />
      <TouchableOpacity style={styles.container} onPress={showProduct}>
        <Text style={{fontSize: 18}}>{Moment(order.title).format('DD/MM/YYYY | HH:mm')}</Text>
        <Text style={{fontSize: 13}}>{order.status === 'ANALYZING' ? 'Analisando' : 'Aprovado'}</Text>
      </TouchableOpacity>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderColor: '#rgb(164, 176, 190)',
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 80,
    margin: 10,
    backgroundColor: '#rgb(255, 255, 255)',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-around',
    alignContent: 'center'
  }
})

export default Order;
