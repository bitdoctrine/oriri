import { fetchUserInfo, fetchCart } from '../utils/fetchLocalData';

const userInfo = fetchUserInfo();
const cartInfo = fetchCart();

export const initialState = {
  user: userInfo,
  menuItems: null,
  cartShow: false,
  cartItems: cartInfo,
};
