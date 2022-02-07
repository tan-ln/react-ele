import axios from 'axios'
import { URL } from '../api/config'

const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
}

const initState = {
  isLogin: false,
  username: null,
  phone: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        ...action.data
      }
    case types.LOGOUT:
      return {
        ...state,
        ...initState
      }
    default: return state
  }
}

// actions
const loginAction = (data) => ({
  type: types.LOGIN,
  data
})

const logoutAction = () => ({
  type: types.LOGOUT,
})

// 登录
export const requestLogin = (phone, password) => {
  const url = URL.root
  axios.post(`${url}/login`, {
    phone,
    password
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}
