import axios from "axios";
import {
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
  FAIL_ADD_GSL,
  FAIL_ADD_GSL_COMMON_SETTINGS,
  FAIL_ALL_GSL_CHAIRPOV,
  FAIL_GSL,
  REQUEST_ADD_GSL,
  REQUEST_ADD_GSL_COMMON_SETTINGS,
  REQUEST_ALL_GSL_CHAIRPOV,
  REQUEST_GSL,
  SUCCESS_ADD_GSL,
  SUCCESS_ALL_GSL_CHAIRPOV,
  SUCCESS_GSL,
  SUCCESS_ADD_GSL_COMMON_SETTINGS,
  REQUEST_GSL_COMMON_SETTINGS,
  SUCCESS_GSL_COMMON_SETTINGS,
  FAIL_GSL_COMMON_SETTINGS,
  REQUEST_SAVE_GSL_DETAILS,
  SUCCESS_SAVE_GSL_DETAILS,
  FAIL_SAVE_GSL_DETAILS,
  REQUEST_GET_GSL_DETAILS,
  SUCCESS_GET_GSL_DETAILS,
  FAIL_GET_GSL_DETAILS,
  REQUEST_START_GSL,
  SUCCESS_START_GSL,
  FAIL_START_GSL,
  REQUEST_GET_GSL_INFO_DETAILS,
  SUCCESS_GET_GSL_INFO_DETAILS,
  FAIL_GET_GSL_INFO_DETAILS,
} from "../constants/GSLConstants";
import { getCookie } from "../utils/cookie";

//Delegate
export const getGSLData = (delegateID) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_GSL });
    const headers = getCookie();

    const { data } = await axios.get(`/api/gsl`, {
      params: {
        id: delegateID,
      },
      headers: headers,
    });
    dispatch({
      type: SUCCESS_GSL,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_GSL,
      payload: error.response.data.error,
    });
  }
};

// ChairPerson Fetch All GSL

export const getALLGSLDataChairPOV = () => async (dispatch, getState) => {
  try {
    dispatch({ type: REQUEST_ALL_GSL_CHAIRPOV });
    const headers = getCookie();
    const committee = getState().delegate_details.delegate_info.community;
    // const community = getState().delegate_details.delegate_info.community
    const { data } = await axios.get(`/api/chair/gsl?committee=${committee}`, {
      headers: headers,
    });
    // const { data } = await axios.get(`api/gsl?id=${delegateID}`, { headers: headers});
    dispatch({
      type: SUCCESS_ALL_GSL_CHAIRPOV,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_ALL_GSL_CHAIRPOV,
      payload: error.response.data.error,
    });
  }
};

// Add GSL
export const addGSLData = (delegatesIds) => async (dispatch, getState) => {
  try {
    dispatch({ type: REQUEST_ADD_GSL });
    const headers = getCookie(true);
    const pendingCommitteeSession =
      getState().comm_session.pendingCommitteeSession;
    // console.log(pendingCommitteeSession);
    const { data } = await axios.post(
      "/api/chair/gsl",
      {
        delegatesIds,
        session: pendingCommitteeSession.id,
        community: pendingCommitteeSession.community,
      },
      {
        headers: headers,
        "Content-Type": "application/json",
      }
    );
    dispatch({
      type: SUCCESS_ADD_GSL,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_ADD_GSL,
      payload: error.response.data.error,
    });
  }
};

// Add GSL Common  Settings
export const addGSLCommonSettings = (GSLRawData) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_ADD_GSL_COMMON_SETTINGS });
    const headers = getCookie();

    const { data } = await axios.post("/api/chair/gsl_settings", GSLRawData, {
      headers: headers,
    });
    dispatch({
      type: SUCCESS_ADD_GSL_COMMON_SETTINGS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_ADD_GSL_COMMON_SETTINGS,
      payload: error.response.data.error,
    });
  }
};

//Get GSL Common Settings
export const getGSLCommonSettings = (community) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_GSL_COMMON_SETTINGS });
    const headers = getCookie();

    const { data } = await axios.get(
      `/api/chair/gsl_settings?community=${community}`,
      { headers: headers }
    );
    dispatch({
      type: SUCCESS_GSL_COMMON_SETTINGS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_GSL_COMMON_SETTINGS,
      payload: error.response.data.error,
    });
  }
};

//save gsl details
export const saveGSLInfo = (GSLRawData) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_SAVE_GSL_DETAILS });
    const headers = getCookie();

    const { data } = await axios.post("/api/chair/gsl_info", GSLRawData, {
      headers: headers,
    });
    //make a post request with gsl, timeTaken, ratings, notes, comments
    dispatch({
      type: SUCCESS_SAVE_GSL_DETAILS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_SAVE_GSL_DETAILS,
      payload: error.response.data.error,
    });
  }
};

//get gsl details
export const getGSLDetails = (GSLID) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_GET_GSL_DETAILS });
    const headers = getCookie();

    const { data } = await axios.get(`/api/chair/gsl_info?gsl=${GSLID}`, {
      headers: headers,
    });
    dispatch({
      type: SUCCESS_GET_GSL_DETAILS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_GET_GSL_DETAILS,
      payload: error.response.data.error,
    });
  }
};

//start gsl and changes status of current GSL
export const startGSL = (GSLStatusRawData) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_START_GSL });
    const headers = getCookie();
    const { data } = await axios.put(`/api/chair/gsl_status`,GSLStatusRawData , {
      headers: headers,
    });
    dispatch({
      type: SUCCESS_START_GSL,
      payload: data,
      
    });
  } catch (error) {
    dispatch({
      type: FAIL_START_GSL,
      payload: error.response.data.error,
    });
  }
};

//Fetch GSL Status 
export const getGSLInfo = (gsl) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_GET_GSL_INFO_DETAILS });
    const headers = getCookie();
    const { data } = await axios.get(`/api/chair/gsl_info?gsl=${gsl}`, {
      headers: headers,
    });
    dispatch({
      type: SUCCESS_GET_GSL_INFO_DETAILS,
      payload: data.data,
      
    });
  } catch (error) {
    dispatch({
      type: FAIL_GET_GSL_INFO_DETAILS ,
      payload: error.response.data.error,
    });
  }
};



//CURRENT GSL SELECTED
// export const currentGSLSelected = (GSLID) => async (dispatch) => {
//   try {
//     dispatch({ type: SELECT_CURRENT_GSL, payload: GSLID });
//   } catch (error) {
//     console.log(error);
//   }
// };

// //clear current GSL
// export const clearCurrentGSL = () => async (dispatch) => {
//   try {
//     dispatch({ type: CLEAR_CURRENT_GSL });
//   } catch (error) {
//     console.log(error);
//   }
// };





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
