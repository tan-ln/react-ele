import React from 'react'
import './index.css'
class TabsHeader extends React.Component {
  constructor () {
    super()
    this.state = {
      current: 0
    }
  }

  clickTab (index) {
    this.setState({
      current: index
    })
    this.props.clickTab(index)
  }

  render () {
    const tabList = [
      {
        title: '点餐',
        num: 0
      },
      {
        title: '评价',
        num: 1
      },
      {
        title: '店铺',
        num: 2
      }
    ]
    
    return (
      <div className="shoptabs">
        <nav className="tabs_header">
          { tabList.map((item, index) => {
            return (
              <div className={`tab_cell ${this.state.current === index ? 'tab_cell_active' : ''}`} key={ index } onClick={ this.clickTab.bind(this, index) }>
                <p className="tab_title">
                  { item.title }
                  <span className="tab_underline"></span>  
                </p>
              </div>
            )
          }) }
        </nav>      
      </div>

    )
  }
}

export default TabsHeader
