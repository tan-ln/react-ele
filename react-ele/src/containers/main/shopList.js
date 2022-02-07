import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ShopList from '../../components/main/shopList'
import Loading from '../../components/loadingIcon/loading'
import { requestGetShopList } from '../../reducers/shopList'
import { setCurrentlocation } from '../../reducers/getAddress'

class ShopListSmart extends Component {
  static propTypes = {
    shopList: PropTypes.array,
    requestGetShopList: PropTypes.func,
    setCurrentlocation: PropTypes.func
  }

  constructor () {
    super ()
    this.state = {
      onpullData: false,
      noMoreData: false,
      shopListTitle: '推荐商家'
    }

    this.onShopListScroll = this.onShopListScroll.bind(this)
    this.timer = true
  }

  componentDidMount () {
    this.props.requestGetShopList()
    this.props.setCurrentlocation()
    window.addEventListener('scroll', this.onShopListScroll)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.curSite && this.props.curSite.latitude !== nextProps.curSite.latitude && this.props.curSite.longitude !== nextProps.curSite.longitude) {
      this.props.requestGetShopList()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onShopListScroll)
  }

  onShopListScroll () {
    if (!this.timer) return
    this.timer = false
    this.setState({
      onpullData: true
    })
    setTimeout(() => {
      // 滚动距离
      let scrTop = document.documentElement.scrollTop || document.body.scrollTop,
        // body 高度
        offsetHeight = document.body.offsetHeight,
        // 屏幕可视区高
        screenHeight = window.screen.height,
        // 自定义距离底部 多少 concat 数据
        height = 10
        
      if (offsetHeight - scrTop - height < screenHeight) {
        let offset = this.props.shopList.length
        this.setState({
          onpullData: false
        })
        this.props.requestGetShopList(offset, this.props.rank_id)
      }
      this.timer = true
    }, 1500)
  }

  render () {
    return (
      <div>
        <div className="shopListTitle">{ this.state.shopListTitle }</div>
        <ShopList data={ this.props.shopList } />
        <div className="bottom-loadMore">
          {
            this.state.onpullData ? <Loading /> : this.state.noMoreData ? <span>没有更多数据</span> : null
          }
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  shopList: state.shopList.list,
  curSite: state.getAddress.site,
  rank_id: state.shopList.rank_id
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  requestGetShopList,
  setCurrentlocation
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ShopListSmart)
