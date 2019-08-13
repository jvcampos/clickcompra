import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 30
  },
  text: {
    // fontFamily: 'Roboto',
    fontSize: 20
  },
  containerInputs: {
    top: 80,
  },
  containerButton: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  button: {
    width: 300,
    marginVertical: 10,
    backgroundColor: '#2ecc71'
  }
})

export default styles