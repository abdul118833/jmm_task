import axios from "axios";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

// Login Handler Action
export const loginHandler = (email,password) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_LOADING, data: true });
    return axios
      .post(`${process.env.REACT_APP_SERVER_PATH}/login`,{
        email,
        password
      })
      .then((res) => {
        dispatch({ type: LOGIN_LOADING, data: false });
        localStorage.setItem("jmm_token",res.data.token)
        return dispatch({ type: LOGIN_SUCCESS, data: res.data.token });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_LOADING, data: false });
        return dispatch({ type: LOGIN_FAILED, data: error?.response?.data?.message });
      });
  };
};
