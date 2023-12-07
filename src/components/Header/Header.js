import React from 'react';
import './Header.css';
import { Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import Logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return{
        token : state.token
    }
}
const Header = props => {
    let links = null
    if(props.token === null) {
        links = 
        <Nav className='ms-md-5 gap-4'>
            <NavItem>
                <NavLink to='/login' className='NavLink'>Login</NavLink>
            </NavItem>
        </Nav>
    }else{
        links = <Nav className='ms-md-5 gap-4'>
                    <NavItem>
                        <NavLink to='/' className='NavLink'>Burger Builder</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='/order' className='NavLink'>Order</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='/logout' className='NavLink'>Logout</NavLink>
                    </NavItem>
                </Nav>
    }
  return (
    <div className='Navigation'>
        <Navbar style={{backgroundColor: '#D70F64', height: '70px'}}>
            <NavbarBrand href='/' className='mr-auto me-md-5 Brand'>
                <img src={Logo} alt='Logo' width='80px' />
            </NavbarBrand>
            {links}
        </Navbar>
    </div>
  )
}

export default connect(mapStateToProps) (Header);