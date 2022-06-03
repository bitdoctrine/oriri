import { fetchUserInfo } from '../utils/fetchLocalData';

const userInfo = fetchUserInfo();

export const initialState = {
  user: userInfo,
  menuItems: null,
};
