import axios from 'axios';
// import { API_URL } from '@env';
import {API_URL} from '@env';

export const getUserByIdApi = token => {
  const config = {
    headers: {
      'x-access-token': token,
    },
  };
  const url = API_URL + '/users/detail';
  return axios.get(url, config);
};

export const updatePassword = (token, body) => {
  const config = {
    headers: {
      'x-access-token': token,
    },
  };
  const url = API_URL + '/users/update-password';
  return axios.patch(url, body, config);
};

export const updateProfileApi = async (body, token) => {
  const url = API_URL + '/users/edit';
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-access-token': token,
    },
    body: body,
  });
  return res;
};
