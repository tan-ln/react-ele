import React, { Component } from 'react'
import ShopHeader from './shopHeader'
import { getShopdetails } from '../../api/getData'

import TabsSmart from './shopTabs/tabs_con'
 
class ShopDetails extends Component {
  constructor () {
    super ()
    this.state = {
      restMessage: {},
      current: 0
    }
  }

  async componentDidMount () {
    const restMessage = await getShopdetails(this.props.id)
    this.setState({
      restMessage
    })
  }

  render () {

    const skeletonSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 603"><g fill="none" fillRule="evenodd" transform="translate(-2)"><path fill="#FFF" d="M2 69h375v534H2z"/><path fill="#EEE" d="M2 0h375v69H2z"/><rect width="66" height="66" x="157" y="23" fill="#F6F6F6" rx="2"/><path fill="#EEE" d="M65 99h250v24H65zm0 31h250v13H65z"/><path fill="#F6F6F6" d="M65 150h250v13H65zM2 300h77v303H2z"/><path stroke="#F6F6F6" d="M26.5 172.5h326v28h-326z"/><path fill="#EEE" d="M50 180h280v13H50z"/><path stroke="#F6F6F6" strokeLinecap="square" d="M.5 248.5h379.005"/><g transform="translate(88 278)"><path fill="#EEE" d="M267 82v-3.998a.999.999 0 1 0-2 0V82h-3.998a.999.999 0 1 0 0 2H265v3.998a.999.999 0 1 0 2 0V84h3.998a.999.999 0 1 0 0-2H267zm-1 12c-6.075 0-11-4.925-11-11s4.925-11 11-11 11 4.925 11 11-4.925 11-11 11z"/><rect width="74" height="74" x="1" y="13" fill="#F6F6F6" rx="2"/><path fill="#EEE" d="M87 13h140v16H87zm0 25h126v11H87zm0 31h33v18H87z"/><path stroke="#F6F6F6" strokeLinecap="square" d="M.473 1.5h293.032"/></g><g transform="translate(88 393)"><path fill="#EEE" d="M267 82v-3.998a.999.999 0 1 0-2 0V82h-3.998a.999.999 0 1 0 0 2H265v3.998a.999.999 0 1 0 2 0V84h3.998a.999.999 0 1 0 0-2H267zm-1 12c-6.075 0-11-4.925-11-11s4.925-11 11-11 11 4.925 11 11-4.925 11-11 11z"/><rect width="74" height="74" x="1" y="13" fill="#F6F6F6" rx="2"/><path fill="#EEE" d="M87 13h140v16H87zm0 25h126v11H87zm0 31h33v18H87z"/><path stroke="#F6F6F6" strokeLinecap="square" d="M.473 1.5h293.032"/></g><g transform="translate(88 509)"><path fill="#EEE" d="M267 82v-3.998a.999.999 0 1 0-2 0V82h-3.998a.999.999 0 1 0 0 2H265v3.998a.999.999 0 1 0 2 0V84h3.998a.999.999 0 1 0 0-2H267zm-1 12c-6.075 0-11-4.925-11-11s4.925-11 11-11 11 4.925 11 11-4.925 11-11 11z"/><rect width="74" height="74" x="1" y="13" fill="#F6F6F6" rx="2"/><path fill="#EEE" d="M87 13h140v16H87zm0 25h126v11H87zm0 31h33v18H87z"/><path stroke="#F6F6F6" strokeLinecap="square" d="M.473 1.5h293.032"/></g><path fill="#EEE" d="M50 222h29v16H50zm39 35h29v16H89zM9 267h50v15H9zm0 54h50v15H9zm0 49h50v15H9zm0 101h50v15H9zm0-49h50v15H9zm0 101h50v15H9zm0 50h50v15H9zm166-351h29v16h-29zm126 0h29v16h-29z"/><path fill="#F5F5F5" d="M2 556h375v47H2z"/></g></svg>

    const shopContainer = (
      <div>
        <ShopHeader headerInfo={ this.state.restMessage.rst } />
        <TabsSmart menu={this.state.restMessage.menu } shopId={ this.props.id } restMessage={ this.state.restMessage.rst } />
      </div>
      )
      
    return (
      <div className="shop_container" style={{ backgroundColor: '#fff', height: '100%' }}>
        { Object.keys(this.state.restMessage).length > 0 ? shopContainer : skeletonSVG }
      </div>
    )
  }
}

export default ShopDetails
