// src/reducers/userReducer.js
import { SET_USER, LOGOUT_USER } from '../actions/userActions';

const initialState = {
  _id: null,
  users_fullname: '',
  users_email: '',
  users_status: '',
  users_phone: '',
  avatar: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload
      };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
