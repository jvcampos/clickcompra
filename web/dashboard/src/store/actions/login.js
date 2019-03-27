import axios from 'axios';
import passwordHash from 'password-hash';
const ROOT_URL = `https://localhost:3001/api/login`

export default function userLogin(email, password){
    return dispatch => {
      const url = ROOT_URL
      var hashedPassword = passwordHash.generate('123');
      console.log(hashedPassword)
      axios.post(url, {email, password})
      .then(res => {
          dispatch(res.data)
          // return {
          //     type: 'USER_LOGIN',
          //     email,
          //     password,
          // }
        }).catch((error) => {
          console.log(`Error ==> ${error}`)
        })
    }
}