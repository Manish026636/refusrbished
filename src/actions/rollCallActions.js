import axios from "axios";
import {
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
  FAIL_MARKED_ROLL_LIST,
  FAIL_ROLL_CALL,
  FAIL_ROLL_LIST,
  REQUEST_MARKED_ROLL_LIST,
  REQUEST_ROLL_CALL,
  REQUEST_ROLL_LIST,
  SUCCESS_MARKED_ROLL_LIST,
  SUCCESS_ROLL_CALL,
  SUCCESS_ROLL_LIST,
} from "../constants/RollCallConstants";
import { getCookie } from "../utils/cookie";
//roll_list
export const getRollList = (comm) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_ROLL_LIST });
    const headers = getCookie();

    const { data } = await axios.get(`/api/chair/get_all?community=${comm}`, {
      headers: headers,
    });
    dispatch({
      type: SUCCESS_ROLL_LIST,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_ROLL_LIST,
      payload: error.response.data.error,
    });
  }
};

//roll_call
export const doRollCall = (roll) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_ROLL_CALL });
    const headers = getCookie();
    const { data } = await axios.post(`/api/chair/roll_call`, roll, {
      headers: headers,
    });
    dispatch({
      type: SUCCESS_ROLL_CALL,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_ROLL_CALL,
      payload: error.response.data.error,
    });
  }
};

//get marked roll list
export const getMarkedRollList = (session) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_MARKED_ROLL_LIST });
    const headers = getCookie();
    const { data } = await axios.get(
      `/api/chair/roll_call?sessions=${session}`,
      {
        headers: headers,
      }
    );
    dispatch({
      type: SUCCESS_MARKED_ROLL_LIST,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_MARKED_ROLL_LIST,
      payload: error.response.data.error,
    });
  }
};

//clear messages
export const clearMessages = () => async (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGES,
  });
};

//clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
