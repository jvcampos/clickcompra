import React from 'react'
import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog';
import { ScrollView, FlatList, Dimensions, View, Text} from 'react-native'
import numeral from 'numeral';

const AllProductsFromOrder = ({isModalVisible, products, clickedOutside, totalValue}) => {
  let {height} = Dimensions.get('window');
  console.log(isModalVisible)
  return (
    <Dialog height={0.5} width={0.95} visible={isModalVisible} onTouchOutside={() => clickedOutside()} dialogTitle={<DialogTitle title="Produtos" />}>
      <DialogContent>
        <ScrollView style={{ marginTop: 5 }}>
          <FlatList
              keyExtractor={(item, index) => index.toString()}
              maxHeight={height - 230}
              data={products}
              renderItem={({ item, id }) => 
                <View key={id} style={{height: 30, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', alignContent: 'center'}}>
                  <Text>Produto: {item.name_product}</Text>
                  <Text>Quantidade: {item.qtde}</Text>
                </View>}
              />
              <View style={{justifyContent: 'center', textAlign: 'center', paddingTop: 30}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>VALOR TOTAL: {numeral(totalValue).format('$0,0.00')}</Text>
              </View>
        </ScrollView>
      </DialogContent>
    </Dialog>
  )
}

export default AllProductsFromOrder
