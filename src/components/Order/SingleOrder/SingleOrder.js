import React from 'react';

const SingleOrder = (props) => {
    const ingredientSummary = props.order.ingredients.map((item) =>{
        return (<span style={{ border: '1px solid grey', boxShadow : '1px solid #888888', borderRadius : '5px', padding : '20px', marginBottom : '20px'}} key={item.type}>{item.amount} X <span style={{textTransform : 'capitalize'}} > {item.type} </span> </span>)
    })
    return (
        <div style={{ border: '1px solid grey', borderRadius : '5px', padding : '5px', marginLeft : '10px'}}>
            <p>Order Now : {props.order.id} </p>
            <p>Delivery Address : {props.order.customer.deliverAddress} </p>
            <hr />
            {ingredientSummary}
            <hr />
            <p>Total : {props.order.price} </p>
        </div>
    )
}

export default SingleOrder;