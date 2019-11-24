import React, {useState, useEffect} from 'react'
import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog';
import { ScrollView, FlatList, Dimensions} from 'react-native'
import SupermarketApproved from './SupermarketApproved'
import _ from 'lodash';
import superagent from 'superagent'
import { useDispatch } from 'react-redux';
import { cleanCart } from '../../store/actions/cart';
import AsyncStorage from '@react-native-community/async-storage';

const BestSupermarketsPopup = ({clickedOutside, navigation, isModalVisible, supermarkets, supermarketsSelecteds, closePopUp}) => {
  let {height} = Dimensions.get('window');
  const dispatch = useDispatch();
  const [allSupermaketsOrdered, setAllSupermarketsOrdered] = useState([]);
  useEffect(() => {   
    const supermarketAprovedAndValue = supermarketsSelecteds.map((supermarket, i) => {
      console.log(supermarket)

      const total = _.sumBy(supermarket.map((item) => {
        if(item.qtd > 0) {
          return item.value * item.qtd
        }
      }))

      return {id: supermarket[0]?.id_supermarket, total}
    })
    setAllSupermarketsOrdered(supermarketAprovedAndValue)
    // setAllSupermarketsOrdered(_.orderBy(supermarketAprovedAndValue, 'total'))
  }, [supermarketsSelecteds])

  const sendSupermarketSelected = async (supermarket) => {
    const idUser = await AsyncStorage.getItem('idUser')
    await superagent
    .post('http://10.0.2.2:3001/api/finalizarCompra')
    .query({
      user_id: idUser,
      id_supermarket: supermarket.id,
      total: supermarket.total
    }).then((resp) => {
      dispatch(cleanCart());
      closePopUp()
      navigation.navigate('Home')
    }).catch((e) => {
      console.log(e)
    })
  } 
  console.log(allSupermaketsOrdered)
  return (
    <Dialog height={0.5} width={0.95} visible={isModalVisible} onTouchOutside={clickedOutside} dialogTitle={<DialogTitle title="Melhores Opções" />}>
      <DialogContent>
        <ScrollView style={{ marginTop: 5 }}>
          <FlatList
              keyExtractor={(item, index) => index.toString()}
              maxHeight={height - 230}
              data={allSupermaketsOrdered}
              renderItem={({ item, id }) => <SupermarketApproved key={id} nameSupermarket={_.find(supermarkets, ['id', item.id])?.social_reason} total={item.total} selectSupermarket={() => sendSupermarketSelected(item)} />}
              />
        </ScrollView>
      </DialogContent>
    </Dialog>
  )
}

export default BestSupermarketsPopup
