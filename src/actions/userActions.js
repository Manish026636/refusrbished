import axios from "axios";
import { CLEAR_CAPTCHA } from "../constants/captchaConstants";
import { CLEAR_DELIGATES } from "../constants/deligateConstants";
import {
  CLEAR_ERRORS,
  FAIL_LOGIN,
  FAIL_LOGOUT,
  FAIL_REGISTRATION,
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  REQUEST_REGISTRATION,
  SUCCESS_LOGIN,
  SUCCESS_LOGOUT,
  SUCCESS_REGISTRATION,
} from "../constants/userConstants";

export const userRegistration = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_REGISTRATION });
    dispatch({ type: CLEAR_CAPTCHA });
    const headers = { Accept: "application/json" };

    const { data } = await axios.post("/api/register", userData, headers);
    dispatch({
      type: SUCCESS_REGISTRATION,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: FAIL_REGISTRATION,
      payload: error.response.data.error,
    });
  }
};

//login action
export const userLogin = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LOGIN });
    dispatch({ type: CLEAR_CAPTCHA });
    const headers = { Accept: "application/json" };

    const { data } = await axios.post("api/login", userData, headers);
    dispatch({
      type: SUCCESS_LOGIN,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: FAIL_LOGIN,
      payload: error.response.data.error,
    });
  }
};

//logout action
export const userLogout = () => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LOGOUT });
    const headers = { Accept: "application/json" };

    const { data } = await axios.post("api/logout", headers);
    dispatch({ type: CLEAR_DELIGATES });
    dispatch({
      type: SUCCESS_LOGOUT,
      payload: data,
    });
      localStorage.removeItem('persist:root');

  } catch (error) {
    dispatch({
      type: FAIL_LOGOUT,
      payload: error.response.data.error,
    });
    localStorage.removeItem('persist:root');

  }
};

export const clearErrors = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_ERRORS });
  } catch (error) {
    console.log(error);
  }
};
