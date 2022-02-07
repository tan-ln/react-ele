import React, { Component } from 'react'
import BackBtn from '../../../components/backButton'
import { formatUrl } from '../../../api/config.js' 

import './index.css'

class ShopHeader extends Component {
  
  render () {
    let shopInfo = this.props.headerInfo,
       shopBgImg = formatUrl(shopInfo.image_path, 'bg'),
      shopAvatar = formatUrl(shopInfo.image_path, 'avatar')
    
    let FirstActivity = shopInfo.activities.length > 0 ? shopInfo.activities[0] : null
    
    return (
      <div className="header_wrapper">
        <div className="shop_msg">
          <div className="shop_bg_img" style={{ backgroundImage: `url(${shopBgImg})` }} >
            <BackBtn />
          </div>
          <div className="shop_info">
            <div className="shop_avatar">
              <img src={shopAvatar} alt={shopInfo.name} />
            </div>
            <div className="shop_related">
              <h2 className="shop_name">
                <span>{ shopInfo.name }</span>
              </h2>
              <div className="shop_other">
                <span className="eval">评价{shopInfo.rating}</span>
                <span className="month_sell">月售{shopInfo.recent_order_num}</span>
                <span className="delivery">{shopInfo.delivery_mode.text}约{shopInfo.order_lead_time}分钟</span>
              </div>
            </div>
            {
              FirstActivity ?  
              <div className="shop_act">
                <div className="single_act">
                  <span className="act_mini_tag" style={{ backgroundColor: `#${ FirstActivity.icon_color }` }}>{ FirstActivity.icon_name }
                    <span className="act_txt">{ FirstActivity.icon_name }</span>
                  </span>
                  <span className="activity">{ FirstActivity.description }</span>
                </div>
                <div className="show_act_btn">
                  { shopInfo.activities.length }个优惠
                </div>
              </div> : ''
            }
            <div className="announcement">
              <p className="announce_txt">公告：{shopInfo.promotion_info ? shopInfo.promotion_info : '欢迎光临，用餐高峰期请提前下单，谢谢。'}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShopHeader
