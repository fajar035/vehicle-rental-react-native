import axios from 'axios';
// import { API_URL } from '@env';
import {API_URL} from '@env';

export const registerApi = body => {
  const url = API_URL + '/auth/register';
  return axios.post(url, body);
};

export const loginApi = body => {
  const url = API_URL + '/auth/login';
  return axios.post(url, body);
};

export const logoutApi = config => {
  const url = API_URL + '/auth/logout';
  return axios.delete(url, config);
};
