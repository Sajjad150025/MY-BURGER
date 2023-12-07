import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/AuthActionCreators';


const mapDispatchToProps = dispatch =>{
    return{
        logout : () => dispatch(logout()),
    }
}
export class LogOut extends Component {
    componentDidMount(){
        this.props.logout();
    }
  render() {
    return (
      <div>
        <Navigate to='/' />
      </div>
      
    )
  }
}

export default connect(null, mapDispatchToProps)(LogOut);