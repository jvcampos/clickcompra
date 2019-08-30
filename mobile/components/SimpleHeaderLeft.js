import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS } from '../constants/styles';

const SimpleHeaderLeft = ({style, title, onGoBack, color, titleStyle}) =>
  <TouchableOpacity style={[styles.headerContainer, style]} onPress={onGoBack}>
    <View style={styles.headerLeft}>
      <Icon name="arrow-left" size={30} color={color ? color : COLORS.white} />
      <Text style={[{color: color ? color : COLORS.white , paddingLeft: 5, fontFamily: FONTS.bold}, titleStyle]}>{title}</Text>
    </View>
  </TouchableOpacity>;

const styles = StyleSheet.create({
  headerContainer: {
    width: '15%',
    flexDirection: 'row',
    paddingBottom: 5,
    backgroundColor: COLORS.transparent,
    paddingTop: 10,
    alignItems: 'center',
    marginLeft: 15,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
  },
});

export default SimpleHeaderLeft;
