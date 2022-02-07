import axios from 'axios'
import { URL, param } from './config.js'

export const getGeoHash = (latitude, longitude) => new Promise((resolve, reject) => {
  const url = URL.geohash
  axios.get(url, {
    params: {
      latitude,
      longitude
    }
  }).then(res => {
    resolve(res.data)
  })
})

// 店铺详情
export const getShopdetails = (id) => new Promise((resolve, reject) => {
  let rstData = JSON.parse(window.localStorage.getItem('RESTAURANT_DATA')),
    location = JSON.parse(window.localStorage.getItem('LOCATION'))
  if (rstData && id === rstData.rst.id) {
    resolve(rstData)
  } else {
    const url = URL.shopDetails
    axios.get(`${url}/${id}/batch_shop`, {
      params: {
        user_id: param.USERID,
        code: '0.18223308543384897', // 后 16 位随机数都行
        extras: '["activities","albums","license","identification","qualification"]',
        terminal: "h5",
        latitude: location.latitude,
        longitude: location.longitude
      }
    }).then(res => {
      window.localStorage.setItem('RESTAURANT_DATA', JSON.stringify(res.data))
      console.log('get data from service')
      resolve(res.data)
    })
  }
})

// 商家列表
export const requestRestList = (latitude, longitude, offset = 0, rank_id = null) => new Promise((resolve, reject) => {
  const url = URL.restaurants
  axios.get(url, {
    params: {
      latitude,
      longitude,
      offset,
      limit: 8,
      extras: ['activities', 'tags'],
      extra_filters: 'home',
      rank_id,
      terminal: 'h5'
    }
  }).then(res => {
    let rank_id = res.data.meta.rank_id, restList = res.data.items
    resolve({rank_id, restList})
    console.log('request shopList')
  }).catch(err => {
    console.log(err)
  })
})

// 搜索结果商品列表
export const requestSearchResult = (keyword) => new Promise((resolve, reject) => {
  let location = JSON.parse(window.localStorage.getItem('LOCATION'))
  if (!keyword || !location) return
  const url = URL.searchEntity
  axios.get(url, {
    params: {
      kw: keyword,
      latitude: location.latitude,
      longitude: location.longitude,
      city_id: location.city_id
    }
  }).then(res => {
    let result = res.data
    resolve(result)
  }).catch(err => {
    console.log(err)
  })
})

// 搜索结果商家列表
export const requestSearhShopList = (keyword) => new Promise(resolve => {
  let location = JSON.parse(window.localStorage.getItem('LOCATION'))
  if (!keyword || !location) return
  const url = URL.searchShopList
  axios.get(url, {
    params: {
      offset: 0,
      limit: 15,
      keyword,
      latitude: location.latitude,
      longitude: location.longitude,
      search_item_type: 3,
      is_rewrite: 1,
      extras: ['activities', 'coupon'],
      terminal: 'h5'
    }
  }).then(res => {
    const data = res.data
    resolve(data)
  }).catch(err => {
    console.log(err)
  })
})

// 分类 id 集
export const requestGetSiftFactors = (entry_id) => new Promise(resolve => {
  const url = URL.siftFactors
  let location = JSON.parse(window.localStorage.getItem('LOCATION'))
  if (!url || !location) return
  axios.get(url, {
    params: {
      entry_id,
      latitude: location.latitude,
      longitude: location.longitude,
      terminal: 'h5'
    }
  }).then(res => {
    resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
})

// 根据 name 获取 id 集
export const requestGetCateIds = (cate_name) => new Promise(resolve => {
  const url = URL.category, location = JSON.parse(window.localStorage.getItem('LOCATION')),
  cateIds = JSON.parse(window.localStorage.getItem('CATEGORY_IDS'))
  let result = []
  if (!cate_name || !location) return
  if (cateIds) {
    result = findIdsByName(cate_name, cateIds)
  } else {
    axios.get(url, {
      params: {
        latitude: location.latitude,
        longitude: location.longitude
      }
    }).then(res => {
      let data = res.data
      window.localStorage.setItem('CATEGORY_IDS', JSON.stringify(data))
      result = findIdsByName(cate_name, cateIds)
    }).catch(err => {
      console.log(err)
    })
  }
  resolve(result)
})

// 简单模糊查询一下
const findIdsByName = (name, list) => {
  let arr = [], nameArr = name.split('')
  list.forEach((item, index) => {
    nameArr.forEach((char, i) => {
      if (item.name.indexOf(char) > -1) {
        arr.push(item.id)
      }
    })
  })
  if (arr.length === 0) {
    arr = Object.assign([], list[0].ids)
  }
  return arr
}

// 获取详细地址
export const requestGetReceiveAddress = () => {
  const address = [
    {
      name: 'tang',
      sex: 1,
      phone: '111111111',
      address: '贝克街 221B'
    }
  ]
  window.localStorage.setItem('RECEIVE_ADDRESS', JSON.stringify(address))
  return address
}

// 读取订单
export const requestGetOrderList = () => {
  let orderList = JSON.parse(window.localStorage.getItem('ORDER_LIST'))
  return orderList
}