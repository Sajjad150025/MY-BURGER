import React, { Component } from 'react'
import Burger from './Burger/Burger'
import Controls from './controls/Controls'
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import Summary from './Summary/Summary';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient, updatePurchasable } from '../../redux/ActionCreator'


const mapStateToProps = state =>{
  return{
    ingredients : state.ingredients,
    totalPrice : state.totalPrice,
    purchasable : state.purchasable
  }
}

const mapDispatchToProps= dispatch => {
  return{
    addIngredient : (igtype) => dispatch(addIngredient(igtype)),
    removeIngredient : (igtype) => dispatch(removeIngredient(igtype)),
    updatePurchasable : () => dispatch(updatePurchasable())
  }
}

export class BurgerBuilder extends Component {
  state ={
    modalOpen : false,
    onClickCheckout : false
  }

  addIngredientHandle = type =>{
    this.props.addIngredient(type);
    this.props.updatePurchasable();
  }


  removeIngredientHandle = type =>{
    this.props.removeIngredient(type);
    this.props.updatePurchasable();
  }

  toggleModal =() =>{
    this.setState({
      modalOpen : !this.state.modalOpen
    })
  }

  handleCheckout = () =>{
    this.setState({
      onClickCheckout : true
    })
  }

  render() {
    return (
      <div>
        <div className='d-flex flex-column flex-md-row'>
          <Burger ingredients= {this.props.ingredients} />  
          <Controls ingredientAdded ={this.addIngredientHandle} ingredientRemove={this.removeIngredientHandle} price ={this.props.totalPrice} toggleModal={this.toggleModal} purchasable = {this.props.purchasable} />      
        </div>
        <Modal isOpen={this.state.modalOpen}>
            <ModalHeader>Your Order Summary</ModalHeader>
            <ModalBody>
                <h5>Total Price: {this.props.totalPrice.toFixed(0)} Bdt</h5>
                <Summary ingredients = {this.props.ingredients} />
            </ModalBody>
            <ModalFooter>
              <Button style={{backgroundColor: '#D70F64'}} onClick={this.handleCheckout} >Continue To Checkout</Button>
              <Button color='secondary' onClick={this.toggleModal}>Cancel</Button>
            </ModalFooter>
            {this.state.onClickCheckout && <Navigate to='/checkout' replace={true} />}
        </Modal>
      </div>
      
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);