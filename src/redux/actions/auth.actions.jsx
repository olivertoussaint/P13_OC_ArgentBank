import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from "./type.actions"

export const loginSuccess = (token) => {
  return (dispatch) => {
    // Ici, tu peux effectuer d'autres actions avant de dispatcher
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token,
      },
    });
    // Ex : Sauvegarde du token dans le localStorage
    localStorage.setItem('token', token);
  };
};

export const loginFailed = (error) => {
  return {
    type: LOGIN_FAIL,
    payload: {
      message: error.message || 'Unknown error',
      code: error.code || 500,
    },
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({
      type: LOGOUT,
    });
  };
};


