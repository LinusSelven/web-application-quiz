import Api from '../services/Api'

export default{
  login(credentials){
    return Api().post('auth', credentials)
  },
  register(credentials){
    return Api().post('users/', credentials)
  },
  checkEmail(credentials){
    return Api().post('email', credentials)
  }
}
