const defaultState = {
  user:null,
  userID: null
  }

function reducer(prevState = defaultState, action){
  switch(action.type){
    case "LOGIN":
      return {...prevState, user: action.data}
    default:
      return prevState
  }

}

export default reducer
