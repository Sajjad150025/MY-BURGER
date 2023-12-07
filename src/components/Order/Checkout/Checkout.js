import React, { Component } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";
import { Link } from 'react-router-dom';
import { resetIngredients } from "../../../redux/ActionCreator";



const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
    userId : state.userId,
    token : state.token
  };
};

const mapDispatchToProps = dispatch =>{
  return {
    resetIngredients : () => dispatch(resetIngredients())
  }
}




export class Checkout extends Component {
  state = {
    values: {
      deliveryAddress: "",
      phone: "",
      paymentType: "Cash On Delivery",
    },
    isLoading: false,
  };



  inputChangeHandler = (e) => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value,
      },
    });
  };


  submitHandler = () => {
    this.setState({ isLoading: true });
    const order = {
      ingredients: this.props.ingredients,
      customer: this.state.values,
      price: this.props.totalPrice,
      orderTime: new Date(),
      userId : this.props.userId
    };
    axios
      .post(
        "https://my-burger-bf6ef-default-rtdb.firebaseio.com/order.json?auth=" + this.props.token,
        order
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoading: false,
            isModalOpen : true,
            modalMess : "Order Placed Successfully!"
          });
          this.props.resetIngredients()
        } else {
          this.setState({
            isLoading: false,
            isModalOpen : true,
            modalMess : "Something Went Wrong! Order Again!!!"
          });
        }
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isModalOpen : true,
          modalMess : "Something Went Wrong! Order Again!!!"
        });
      });
  };

  

  render() {
    let form = (
      <div>
        <h4
          style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          {" "}
          Payment : {this.props.totalPrice} BDT
        </h4>
        <form
          style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          <textarea
            name="deliveryAddress"
            onChange={(e) => this.inputChangeHandler(e)}
            value={this.state.values.deliveryAddress}
            className="form-control"
            placeholder="Your Address"
          ></textarea>
          <br />
          <input
            name="phone"
            onChange={(e) => this.inputChangeHandler(e)}
            className="form-control"
            value={this.state.values.phone}
            placeholder="Your Contact Number"
          />
          <br />
          <select
            name="paymentType"
            onChange={(e) => this.inputChangeHandler(e)}
            className="form-control"
            value={this.state.values.paymentType}
          >
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="Bkash">Bkash</option>
            <option value="Nagad">Nagad</option>
          </select>
          <br />
          <Button
            style={{ backgroundColor: "#D70F64" }}
            // disabled={!this.props.purchasable}
            className="ms-auto"
            onClick={this.submitHandler}
          >
            Place Order
          </Button>
          <Link to='/'>
              <Button color="secondary" className="ms-1" type="button">
                Cancel
              </Button>
          </Link>
              
        </form>
      </div>
    );
    return (
      <div>
          {this.state.isLoading ? <Spinner /> : form}
          <Modal isOpen={this.state.isModalOpen} >
            <ModalBody>
                {this.state.modalMess}
            </ModalBody>
          </Modal>
      </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
