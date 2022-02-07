import React from 'react'
import TabBodyWrapper from './tabBodyWrapper'
import OrderingSmart from '../../ordering'
import RatingSmart from '../../rating'
import ShopInfo from '../../shopInfo'

class TabsBody extends React.Component {
  constructor () {
    super () 
    this.state = {
      current: false
    }
  }

  render () {
    return (
      <TabBodyWrapper current={ this.props.current } >
        <OrderingSmart key="0" menu={ this.props.menu } />
        <RatingSmart key="1" />
        <ShopInfo key="2" />
      </TabBodyWrapper>
    )
  }
}

export default TabsBody