import {ACTION_STRING} from '../actions/actionString';
import {ActionType} from 'redux-promise-middleware';

const initialState = {
  authUser: {
    token: '' || null,
    photo: '' || null,
    role: '' || null,
  },

  isPending: false,
  isFulfilled: false,
  isRejected: false,
};
const authReducer = (prevState = initialState, action) => {
  const {authLogin, authReset} = ACTION_STRING;
  const {Pending, Fulfilled, Rejected} = ActionType;
  switch (action.type) {
    case authLogin.concat('_', Pending):
      // console.log('PENDING >>>', prevState);
      return {
        ...prevState,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };

    case authLogin.concat('_', Fulfilled):
      const data = action.payload.data.result;
      var authUser = {
        token: data.token,
        role: data.role,
        photo: data.photo,
      };

      return {
        isRejected: false,
        isPending: false,
        isFulfilled: true,
        authUser,
      };

    case authLogin.concat('_', Rejected):
      var err = action.payload.response;

      return {
        ...prevState,
        isRejected: true,
        isPending: false,
        isFulfilled: false,

        err,
      };
    case authReset:
      return {
        ...prevState,
        isRejected: false,
        isPending: false,
        isFulfilled: false,
      };

    default:
      return prevState;
  }
};

export default authReducer;
