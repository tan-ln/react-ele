import React, { Component } from 'react'
import { requestGetOrderList } from '../../api/getData'
import { formatUrl } from '../../api/config'
import './order.css'

class Order extends Component {
  constructor () {
    super ()
    this.state = {
      orderList: [],
      noOrder: false
    }
  }

  componentDidMount () {
    const orderList = requestGetOrderList()
    if (!orderList || orderList.length === 0) {
      this.setState({
        noOrder: true
      })
    }
    this.setState({
      orderList
    })
  }

  render () {
    let totalPrice = 0
    const orderList = this.state.orderList && this.state.orderList.length > 0 ? this.state.orderList : null
    return (
      <div>
        <div className="no_order" style={{ display: this.state.noOrder ? '' : 'none' }}>暂时还没有订单</div>
        <ul style={{ display: orderList ? 'none' : '' }}>
          {
            [1, 1, 1, 1].map((item, key) => 
              <img key={key} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3NTAgMzI1Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IHdpZHRoPSI3NTAiIGhlaWdodD0iMzI1IiBmaWxsPSIjRkZGIiByeD0iNSIvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgeD0iMzAiIHk9IjI4IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjIyIiB4PSIxMTAiIHk9IjcwIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iNDI3IiBoZWlnaHQ9IjI2IiB4PSIxMTAiIHk9IjE1MCIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMDUiIHJ4PSI0Ii8+PHBhdGggc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBkPSJNMTExLjUgMTI1aDYyME0zMC41IDIwNy41bDY5MyA3Ii8+PHJlY3Qgd2lkdGg9IjE0NiIgaGVpZ2h0PSI1MiIgeD0iNTg5IiB5PSIyNDYiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1IiByeD0iNCIvPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMjYiIHg9IjYxNSIgeT0iMTUwIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iMjEwIiBoZWlnaHQ9IjMyIiB4PSIxMTAiIHk9IjI4IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iOTAiIGhlaWdodD0iMjYiIHg9IjY0NSIgeT0iMzEiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1IiByeD0iNCIvPjwvZz48L3N2Zz4=" alt="" />
            )
          }
        </ul>
        <ul className="order-list_ul">
          {
            orderList ? orderList.map((item, key) => {
              return (
                <li className="order-card_item" key={key}>
                  <div className="order-item_body">
                    <div className="order-shop_logo">
                      <img src={ formatUrl(item.restImg, 'orderShop') } alt={item.restName} />
                    </div>
                    <div className="order-item_content">
                      <div className="order_head">
                        <div className="title">{item.restName}</div>
                        <p className="datetime">{item.created_timestamp}</p>
                      </div>
                      <div className="order_detail">
                          {
                            item.cartList.map((food, key) => {

                              totalPrice += Number(food.specfoods[0].price) * Number(food.num)

                              return(
                                <div className="food_item" key={key}>
                                  <img src={ formatUrl(food.image_path, 'orderFood') } alt={ food.name } />
                                  <span className="food_name">{ food.name }</span>
                                  <span className="food_num">x { food.num }</span>
                                  <span className="food_price"><span>￥</span>{ Number(food.specfoods[0].price) * Number(food.num) }</span>
                                </div>
                              )
                            })
                          }
                        <div className="totalPrice">合计 ￥{ totalPrice }</div>
                      </div>
                    </div>
                  </div>
                  <div className="order-item_bottom">
                    <button>再来一单</button>
                  </div>
                </li>
              )
            }) : null
          }
        </ul>
      </div>
    )
  }
}

export default Order
