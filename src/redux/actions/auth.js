import {ACTION_STRING} from './actionString';
import {loginApi, logoutApi} from '../../utils/auth';

export const loginAction = body => {
  return {
    type: ACTION_STRING.authLogin,
    payload: loginApi(body),
  };
};

export const resetAction = () => {
  return {
    type: ACTION_STRING.authReset,
  };
};

export const logoutAction = config => {
  return {
    type: ACTION_STRING.authLogout,
    payload: logoutApi(config),
  };
};
