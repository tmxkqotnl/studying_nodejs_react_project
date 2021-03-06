import Axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER
} from './types';

export function loginUser(dataToSubmit){
  const request = Axios.post(
    '/api/user/login',
    dataToSubmit
  ).then(res=>res.data);

  return {
    type:LOGIN_USER,
    payload:request
  }
}
export function registerUser(dataToSubmit){
  const request = Axios.post(
    '/api/user/register',
    dataToSubmit
  ).then(res=>res.data);

  return {
    type:REGISTER_USER,
    payload:request
  }
}
export function auth(){
  const request = Axios.get('/api/user/auth')
  .then(res=>res.data);

  return {
    type:AUTH_USER,
    payload:request,
  }
}