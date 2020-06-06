import Api from '../services/Api'
export default{

  // LOGIN LOGOUT REGISTER, AND CHECK IF AN EMAIL EXIST ETC...
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

  //ADD NEW QUIZ
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
    return Api().post('svenskaQuiz/', credentials)
  },

  //MANAGE USERS
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

  //GET QUIZZES QUESTIONS BY LEVEL
  getGeoQuizByLevel(param){
    return Api().get('geoQuiz/level/level/'+param)
  },
  getMatteQuizByLevel(param){
    return Api().get('matteQuiz/level/level/'+param)
  },
  getEngQuizByLevel(param){
    return Api().get('engQuiz/level/level/'+param)
  },
  getSveQuizByLevel(param){
    return Api().get('svenskaQuiz/level/level/'+param)
  },

  //GET EXACTLY LEVELS NUMBERS
  getGeoQuizLevel(){
    return Api().get('geoQuiz/Levels')
  },
  getMatteQuizLevel(){
    return Api().get('matteQuiz/Levels')
  },
  getSveQuizLevel(){
    return Api().get('svenskaQuiz/Levels')
  },
  getEngQuizLevel(){
    return Api().get('engQuiz/Levels')
  },

  //MANAGE SCORES
  addScore(credentials){
    return Api().post('scores/', credentials)
  },
  getScore(credentials){
    return Api().post('scores/level/', credentials)
  },
  getAllScores(credentials){
    return Api().post('allScores/', credentials)
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

  //DELETE QUIZZES QUESTIONS BY ID
  deleteGeoQuiz(param){
    return Api().delete('geoQuiz/'+param)
  },
  deleteMatteQuiz(param){
    return Api().delete('matteQuiz/'+param)
  },
  deleteEngQuiz(param){
    return Api().delete('engQuiz/'+param)
  },
  deleteSveQuiz(param){
    return Api().delete('svenskaQuiz/'+param)
  },

  //ADD AND GET RATES
  addRates(credentials){
    return Api().post('rates/', credentials)
  },
  getRateById(credentials){
    return Api().post('rates/user/', credentials)
  },
  getRateByLevel(credentials){
    return Api().post('rates/level/', credentials)
  },
  getQuantityRates(credentials){
    return Api().post('rates/level/percentage', credentials)
  },
}
