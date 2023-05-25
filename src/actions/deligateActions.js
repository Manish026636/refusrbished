import axios from "axios";
import {
  CLEAR_ERRORS,
  FAIL_DELIGATES,
  FAIL_DELIGATE_DETAILS,
  FAIL_DELIGATE_JOIN,
  REQUEST_DELIGATES,
  REQUEST_DELIGATE_DETAILS,
  REQUEST_DELIGATE_JOIN,
  SELECT_COMMUNITY_ID,
  SUCCESS_DELIGATES,
  SUCCESS_DELIGATE_DETAILS,
  SUCCESS_DELIGATE_JOIN,
  CLEAR_MESSAGES
} from "../constants/deligateConstants";
import { getCookie } from "../utils/cookie";

//get delegate details
export const deligateDetails = () => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_DELIGATES });
    const headers = getCookie();
    const { data } = await axios.get("/api/delegate", { headers: headers });
    dispatch({
      type: SUCCESS_DELIGATES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_DELIGATES,
      payload: error.response.data.error,
    });
  }
};

//new deligate joining
export const delegateJoining = (val) => async (dispatch) => {
  try {
    console.log(val);
    dispatch({ type: REQUEST_DELIGATE_JOIN });

    const headers = getCookie();
    const { data } = await axios.post("/api/delegate", val, {
      headers: headers,
    });
    dispatch({
      type: SUCCESS_DELIGATE_JOIN,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_DELIGATE_JOIN,
      payload: error.response.data.error,
    });
  }
};

export const selectCommunity = (id) => async (dispatch) => {
  try {
    dispatch({ type: SELECT_COMMUNITY_ID, payload: id });
  } catch (error) {
    console.log(error);
  }
};

//new deligate joining
export const getDelegateDetails = (val) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_DELIGATE_DETAILS });

    const headers = getCookie();
    const { data } = await axios.get(`/api/delegate${val ? "?id=val" : ""}`, {
      headers: headers,
    });
    dispatch({
      type: SUCCESS_DELIGATE_DETAILS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_DELIGATE_DETAILS,
      payload: error.response.data.error,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_ERRORS });
  } catch (error) {
    console.log(error);
  }
};
export const clearMessages = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_MESSAGES });
  } catch (error) {
    console.log(error);
  }
};
