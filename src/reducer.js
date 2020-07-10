const defaultState = {
  user:null,
  userID: null
  }

function reducer(prevState = defaultState, action){
  switch(action.type){
    case "LOGIN":
      return {...prevState, user: action.data}
    case "SELLPRICE":
      debugger
      return {...prevState, user: {...prevState.user, turnip_sell_prices: [...prevState.user.turnip_sell_prices, action.data]}}
    default:
      return prevState
  }

}

export default reducer
