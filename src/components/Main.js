import React, { Component } from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Order from './Order/Order';
import Checkout from './Order/Checkout/Checkout';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './Auth/Auth';
import { connect } from 'react-redux';
import { authCheck } from '../redux/AuthActionCreators';
import { LogOut } from './Auth/LogOut';



const mapStateToProps = state =>{
  return {
    token : state.token
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    authCheck : () => dispatch(authCheck()),
  }
}

class Main extends Component {

  componentDidMount(){
    this.props.authCheck();
  }
  render(){
    let routes = null;
  if(this.props.token === null){
    routes = (
      <Routes>
        <Route path="/login" element ={<Auth/>}></Route>
        <Route path='/' element={<Navigate replace to="/login"/>}></Route>
      </Routes>  
    )
  }else {
    routes = (
      <Routes>
          <Route path="/" element={<BurgerBuilder />}></Route>
          <Route path="/order" element={<Order />}></Route>   
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/logout" element={<LogOut />}></Route>
          <Route path='*' element={<Navigate replace to="/"/>}></Route>
      </Routes>
    )
  }
  return (
    <div>
        <Header />
        <div className='container'>
            {routes}
        </div>        
    </div>
  )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);