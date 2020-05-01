const defaultState = {
  game:false,
  }

function reducer(prevState = defaultState, action){
  switch(action.type){
    case "PLAYERS":
      return {...prevState}
    default:
      return prevState
  }

}

export default reducer
