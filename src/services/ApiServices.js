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
  getOneUser(param){
    return Api().get('/users/'+param)
  },
  modifyUser(param, credentials){
    return Api().put('/users/'+param, credentials)
  },
  getAllUsers(){
    return Api().get('users')
  },

  deleteUser(id){
    return Api().delete('users/'+id)
  },

  getGeoQuizLevel(){
    return Api().get('geoQuiz/Levels')
  },
  getGeoQuizByLevel(param){
    return Api().get('geoQuiz/level/'+param)
  },
  getMatteQuizLevel(){
    return Api().get('matteQuiz/Levels')
  },
  getMatteQuizByLevel(param){
    return Api().get('matteQuiz/level/'+param)
  },
  getEngQuizLevel(){
    return Api().get('engQuiz/Levels')
  },
  getEngQuizByLevel(param){
    return Api().get('engQuiz/level/'+param)
  },
  getSveQuizLevel(){
    return Api().get('svenskaQuiz/Levels')
  },
  getSveQuizByLevel(param){
    return Api().get('svenskaQuiz/level/'+param)
  },
  addScore(credentials){
    return Api().post('scores/', credentials)
  },
  getScore(credentials){
    return Api().post('scores/level/', credentials)
  },
  checkScoresIfIsExist(credentials){
    return Api().post('scores/isExist/', credentials)
  },
  checkScoresIfHigh(credentials){
    return Api().post('scores/isHigh/', credentials)
  },
  updateScores(param, credentials){
    return Api().put('scores/'+param, credentials)
  },
  getScoresByUsers(credentials){
    return Api().post('scores/byUsers/', credentials)

  },
}
