import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrder } from '../../redux/ActionCreator';
import SingleOrder from './SingleOrder/SingleOrder';
import Spinner from '../Spinner/Spinner'



const mapStateToProps = state =>{
  return{
    order : state.order,
    orderLoading : state.orderLoading,
    orderErr : state.orderErr,
    token : state.token
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    fetchOrder : (token, userId) => dispatch(fetchOrder(token, userId))
  }
}
export class Order extends Component {
  componentDidMount(){
    this.props.fetchOrder(this.props.token, this.props.userId);
  }
  componentDidUpdate(){
    console.log(this.props)
  }
  render() {
    let order = null
    if(this.props.orderErr){
      order = <p style={{ border: '1px solid grey', boxShadow : '1px solid #888888', borderRadius : '5px', padding : '20px', marginBottom : '20px'}}>Sorry Failed to Load Order!!</p>
    }else{
      if(this.props.order.length === 0){
        order = <p style={{ border: '1px solid grey', boxShadow : '1px solid #888888', borderRadius : '5px', padding : '20px', marginBottom : '20px'}}>Sorry You Have No Order!!</p>
      }else{
        order = this.props.order.map(order =>{
          return <SingleOrder order={order} key={order.id} />
        })
    }
      }
     
    
    return (
      <div>
        {this.props.orderLoading ? <Spinner/> : order}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Order);