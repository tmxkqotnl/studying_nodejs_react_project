import { LOGIN_USER, REGISTER_USER,AUTH_USER } from "../_actions/types";

export default function (preState = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...preState,
        loginSuccess: action.payload,
      };
      break;
    case REGISTER_USER:
      return {
        ...preState,
        registerSuccess: action.payload,
      };
      break;
    case AUTH_USER:
      return {
        ...preState,
        userData: action.payload,
      };
      break;
    default:
      return preState;
  }
}
