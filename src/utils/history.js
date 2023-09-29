import axios from 'axios';
// import { API_URL } from '@env';
import {API_URL} from '@env';

export const historyApi = () => {
  const url = API_URL + '/history';
  return axios.get(url);
};

export const createHistoryApi = body => {
  const url = API_URL + '/history';
  return axios.post(url, body);
};

export const historyByUserApi = name => {
  const url = API_URL + `/history?cari=${name}&sort=desc&by=id`;
  return axios.get(url);
};
