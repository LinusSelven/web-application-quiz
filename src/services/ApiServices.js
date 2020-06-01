import Api from '../services/Api'

export default{
  login(credentials){
    return Api().post('auth', credentials)
  },
  logout(credentials){
    return Api().post('logout', credentials)
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
  newQuizGeo(credentials){
    return Api().post('geoQuiz/', credentials)
  },
  newQuizMat(credentials){
    return Api().post('matteQuiz/', credentials)
  },
  newQuizEng(credentials){
    return Api().post('engQuiz/', credentials)
  },
  newQuizSve(credentials){
    return Api().post('sveQuiz/', credentials)
  },
  userData(credentials){
    return Api().post('users/user/', credentials)
  },
  getAllUsers(){
    return Api().get('users')
  },
  deleteUser(credentials){
    return Api().delete('users/:id', credentials)
  },
  getGeoQuizLevel(){
    return Api().get('geoQuiz/Levels')
  },
  getMatteQuizLevel(){
    return Api().get('matteQuiz/Levels')
  },
  getEngQuizLevel(){
    return Api().get('engQuiz/Levels')
  }
}
