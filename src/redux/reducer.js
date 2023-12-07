import * as actionType from './ActionType'

const INGREDIENT_PRICES = {
    salad : 20,
    cheese : 40,
    meat : 90
  }

const INITIAL_STATE = {
    ingredients: [
        {type: 'salad', amount: 0},
        {type: 'cheese', amount: 0},
        {type: 'meat', amount: 0}
      ],
      order : [],
      orderLoading : true,
      orderErr : false,
      totalPrice: 80,
      purchasable : false,
      token : null,
      userId : null,
      authLoading : false,
      authFailedMess : null
    }

export const reducer = (state = INITIAL_STATE, action) => {
    const ingredients =[...state.ingredients]
    switch(action.type){
        case actionType.ADD_INGREDIENT:
            for(let item of ingredients){
              if(item.type === action.payload) item.amount++
            }
            return{
                ...state,
                ingredients : ingredients,
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.payload]
            }
        case actionType.REMOVE_INGREDIENT:
            for(let item of ingredients){
            if(item.type === action.payload) {if(item.amount <= 0)return state; item.amount--}
            }
            return{
                ...state,
                ingredients : ingredients,
                totalPrice : state.totalPrice - INGREDIENT_PRICES[action.payload]
            }

        case actionType.UPDATE_PURCHASABLE:
            const sum = state.ingredients.reduce((sum, elem) => {
                return sum + elem.amount;
            },0)
            return{
                ...state,
                purchasable: sum > 0,
            }

        case actionType.RESET_INGREDIENTS:
            return{
                ...state,
                ingredients: [
                    {type: 'salad', amount: 0},
                    {type: 'cheese', amount: 0},
                    {type: 'meat', amount: 0}
                ],
                totalPrice: 80,
                purchasable : false,
            }

        case actionType.LOAD_ORDER :
            let order = []
            for(let key in action.payload){
                order.push({
                    ...action.payload[key],
                    id : key
                })
            }
            
            return{
                ...state,
                order : order,
                orderLoading : false
            }

        case actionType.LOAD_ORDER_FAILED :
            return{
                ...state,
                orderErr : true,
                orderLoading : false    
            }

            //Auth cases
        case actionType.AUTH_SUCCESS:
            return{
                ...state,
                token: action.payload.token,
                userId : action.payload.userId
            }
        case actionType.AUTH_LOGOUT:
            return{
                ...state,
                authFailedMess : null,
                token: null,
                userId : null,
            }
        case actionType.AUTH_LOADING:
            return{
                ...state,
                authLoading : action.payload,
            }

        case actionType.AUTH_FAILED:
            return{
                ...state,
                authFailedMess : action.payload
            }
        default :
            return state;
        }
        
    }
