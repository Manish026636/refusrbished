//Delegate
import axios from "axios";
import {
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
  FAIL_ADD_COMMITTEE_SESSION,
  FAIL_ALL_COMMITTEE_SESSION_CHAIRPOV,
  FAIL_COMMITTEE_SESSION,
  REQUEST_ADD_COMMITTEE_SESSION,
  REQUEST_ALL_COMMITTEE_SESSION_CHAIRPOV,
  REQUEST_COMMITTEE_SESSION,
  REQUEST_TERMINATE_COMMITTEE_SESSION,
  SUCCESS_ADD_COMMITTEE_SESSION,
  SUCCESS_ALL_COMMITTEE_SESSION_CHAIRPOV,
  SUCCESS_COMMITTEE_SESSION,
  SUCCESS_TERMINATE_COMMITTEE_SESSION,
 FAIL_TERMINATE_COMMITTEE_SESSION
} from "../constants/committeeSessions";
import { getCookie } from "../utils/cookie";

export const getCommitteeSessionData =
  (committeeSessionId) => async (dispatch) => {
    try {
      dispatch({ type: REQUEST_COMMITTEE_SESSION });
      const headers = getCookie();

      const { data } = await axios.get(`api/chair/committee_session`, {
        params: {
          id: committeeSessionId,
        },
        headers: headers,
      });
      dispatch({
        type: SUCCESS_COMMITTEE_SESSION,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: FAIL_COMMITTEE_SESSION,
        payload: error.response.data.error,
      });
    }
  };

// ChairPerson Fetch All CommitteeSession  

export const getALLCommitteeSessionDataChairPOV = (val) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_ALL_COMMITTEE_SESSION_CHAIRPOV });
    const headers = getCookie();

    const { data } = await axios.get(
      `/api/chair/committee_session?community=${val}`,
      {
        headers: headers,
      }
    );
    dispatch({
      type: SUCCESS_ALL_COMMITTEE_SESSION_CHAIRPOV,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_ALL_COMMITTEE_SESSION_CHAIRPOV,
      payload: error.response.data.error,
    });
  }
};

// Add CommitteeSession
export const addCommitteeSessionData = (sessionsData) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_ADD_COMMITTEE_SESSION });
    const headers = getCookie();

    const { data } = await axios.post(
      "/api/chair/committee_session",
      sessionsData,
      { headers: headers }
    );
    dispatch({
      type: SUCCESS_ADD_COMMITTEE_SESSION,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_ADD_COMMITTEE_SESSION,
      payload: error.response.data.error,
    });
  }
};

//terminate session
export const terminateCommitteeSessionData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: REQUEST_TERMINATE_COMMITTEE_SESSION });
    const headers = getCookie();
    const sessionsData = {session: getState().comm_session.CommitteeSessionData[0].id}
    const { data } = await axios.put("/api/chair/committee_session",sessionsData,{ headers: headers });
    dispatch({
      type: SUCCESS_TERMINATE_COMMITTEE_SESSION,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_TERMINATE_COMMITTEE_SESSION,
      payload: error.response.data.error,
    });
  }
};

// Clear Erorrs

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
