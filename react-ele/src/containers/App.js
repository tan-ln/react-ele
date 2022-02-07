import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Main from  './main/main.js'
import Find from  './find/find.js'
import Order from  './order/order.js'
import My from  './my/my.js'

import Footer from '../components/footer'
import Login from '../components/login/login'

import ShopDetails from './shopDetails/shopDetails'
import Search from './search/search'
import CateResultList from './cateResultList/cateResultList'
import CheckoutOrder from './checkoutOrder/checkoutOrder'

import { setCookie } from '../api/setCookie'

class App extends Component {

  componentWillMount () {
    setCookie()
  }

  render() {

    const Shop = ({ match }) => <ShopDetails id={ match.params.id } />
    const Checkout = ({ location }) => <CheckoutOrder cartList={ location.state } />
 
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={My} />
          {/* <Route path='/find' component={Find} /> */}
          {/* <Route path='/order' component={Order} /> */}
          {/* <Route path='/my' component={My} /> */}
          <Switch>
            <Route path='/login' component={Login} />
            {/* <Route path='/login' component={Login} /> */}
            <Route path='/shop/:id' component={Shop} />
            <Route path='/search' component={Search} />
            <Route path='/cateResult' component={CateResultList} />
            <Route path="/checkout" component={Checkout} />
            <Footer />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
