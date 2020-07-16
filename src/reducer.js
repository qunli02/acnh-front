const defaultState = {
  user: null,
  allUsers: null,
};

function reducer(prevState = defaultState, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...prevState, user: action.data };
    case "SELLPRICE":
      let turnipPrice = prevState.user.turnip_sell_prices.filter((price) => {
        return price.id !== action.data.id;
      });
      return {
        ...prevState,
        user: {
          ...prevState.user,
          turnip_sell_prices: [...turnipPrice, action.data],
        },
      };
    case "ALLUSERS":
      let newUsers = action.data;
      if (prevState.user) {
        newUsers = action.data.filter((user) => {
          return user.id != prevState.user.id;
        });
      }
      return { ...prevState, allUsers: newUsers };
    default:
      return prevState;
  }
}

export default reducer;
