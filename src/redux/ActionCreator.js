import * as actionType from './ActionType';
import axios from 'axios';

export const addIngredient = igtype =>{
    return{
        type : actionType.ADD_INGREDIENT,
        payload : igtype
    }
}

export const removeIngredient = igtype =>{
    return{
        type : actionType.REMOVE_INGREDIENT,
        payload : igtype
    }
}

export const updatePurchasable = () =>{
    return{
        type : actionType.UPDATE_PURCHASABLE
    }
}

export const resetIngredients = ( ) =>{
    return{
        type : actionType.RESET_INGREDIENTS
    }
}

export const loadOrder = (order) =>{
    return{
        type : actionType.LOAD_ORDER,
        payload : order
    }
}

export const loadOrderFailed = () =>{
    return{
        type : actionType.LOAD_ORDER_FAILED
    }
}

export const fetchOrder = (token, userId) => dispatch =>{
    const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('https://my-burger-bf6ef-default-rtdb.firebaseio.com/order.json?auth=' + token + queryParams)
        .then(response => {
            dispatch(loadOrder(response.data))
        })
        .catch(err =>{
            dispatch(loadOrderFailed());
        })
}