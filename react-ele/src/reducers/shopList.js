import { requestRestList } from '../api/getData'
import { getCurCityLocation } from './getAddress'

const types = {
  SUCCESS_GET_SHOP_LIST: 'SUCCESS_GET_SHOP_LIST',
  FAILURE_GET_SHOP__LIST: 'FAILURE_GET_SHOP__LIST',
  GET_RANK_ID: 'GET_RANK_ID'
}

const initState = {
  list: [],
  rank_id: ''
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.SUCCESS_GET_SHOP_LIST:
      return {
        ...state,
        status: 'success',
        list: action.data.list
      }
    case types.FAILURE_GET_SHOP__LIST:
      return {
        ...state,
        status: 'failure'
      }
    case types.GET_RANK_ID:
      return {
        ...state,
        rank_id: action.data.rank_id
      }
    default:
      return state
  }
}

// actions
const successGetShopList = (list) => ({
  type: types.SUCCESS_GET_SHOP_LIST,
  data: {
    list
  }
})

const failureGetShopList = () => ({
  type: types.FAILURE_GET_SHOP__LIST
})

const getRank_IdAction = (rank_id) => ({
  type: types.GET_RANK_ID,
  data: {
    rank_id
  }
})

// localStorage
const setRestaurantsIntoStorge = (data) => {
  window.localStorage.setItem('SHOP_LIST', JSON.stringify(data))
}
const getRestaurantsFromStorage = () => {
  let restList = window.localStorage.getItem('SHOP_LIST')
  return restList ? JSON.parse(restList) : null
}

// 发送获取商铺信息请求
const requestGetShopList = (offset = 0, rank_id = null)  => dispatch => {
  const restList = getRestaurantsFromStorage()
  dispatch(successGetShopList(restList))
  return
  const location = getCurCityLocation()
  // 未定位
  if (!location) {
    dispatch(failureGetShopList())
    return
  }

  let { latitude, longitude } = location
  requestRestList(latitude, longitude, offset, rank_id).then(res => {
    let { rank_id, restList} = res, list = []
    if (offset > 0) {
      const lastData = getRestaurantsFromStorage()
      list = lastData.concat(restList)
    } else {
      list = Object.assign(list, restList)
    }
    setRestaurantsIntoStorge(list)
    dispatch(successGetShopList(list))
    dispatch(getRank_IdAction(rank_id))
  }).catch(err => {
    console.log(err)
    dispatch(failureGetShopList())
    const restList = getRestaurantsFromStorage()
    dispatch(successGetShopList(restList))
  })
}

export {
  requestGetShopList
}
