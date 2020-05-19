import Api from '../services/Api'

export default{
  login(credentials){
    return Api().post('auth', credentials)
  },
  register(credentials){
    return Api().post('users/', credentials)
  },
  requiredFields(credentials){
    return Api().post('fields', credentials)
  },
  checkEmail(credentials){
    return Api().post('email', credentials)
  },
  verifyPasswords(credentials){
    return Api().post('passwords', credentials)
  },
  logout(){
    return Api().post('logout')
  },
}
