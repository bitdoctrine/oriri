export const actionType = {
  SET_USER: 'SET_USER',
  SET_MENU_ITEMS: 'SET_MENU_ITEMS',
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return { ...state, user: action.user };
    case actionType.SET_MENU_ITEMS:
      return { ...state, menuItems: action.menuItems };

    default:
      return state;
  }
};

export default reducer;
