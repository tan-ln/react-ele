import React from 'react'

class TabBodyWrapper extends React.Component {
  constructor () {
    super()
  }
  render () {
    return (
      <div className="tabs_body" style={{ position:'sticky', top: '1.066667rem', zIndex: 3, maxHeight: '626.5px', overflow: 'hidden' }}>
        { React.Children.map(this.props.children, child => {
          return (
            <div style={{ display: Number(child.key) === Number(this.props.current) ? 'block' : 'none' }}>{ child }</div>
          )
        }) }
      </div>
    )
  }
}

export default TabBodyWrapper