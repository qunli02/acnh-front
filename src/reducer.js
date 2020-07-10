const defaultState = {
  user:null,
  userID: null
  }

function reducer(prevState = defaultState, action){
  switch(action.type){
    case "LOGIN":
      return {...prevState, user: action.data}
    case "SELLPRICE":
      let turnipPrice = prevState.user.turnip_sell_prices.filter((price) => {return price.id != action.data.id})
      return {...prevState, user: {...prevState.user, turnip_sell_prices: [...turnipPrice, action.data]}}
    default:
      return prevState
  }

}

export default reducer
