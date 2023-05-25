import axios from "axios";
import {
  CLEAR_ERRORS,
  CLEAR_MSG,
  FAIL_ADD_UNMCAUS,
  FAIL_ALL_UNMCAUS_CHAIRPOV,
  FAIL_CREATE_UNMCUAS_ID,
  FAIL_UNMCAUS,
  REQUEST_ADD_UNMCAUS,
  REQUEST_ALL_UNMCAUS_CHAIRPOV,
  REQUEST_CREATE_UNMCUAS_ID,
  REQUEST_UNMCAUS,
  SUCCESS_ADD_UNMCAUS,
  SUCCESS_ALL_UNMCAUS_CHAIRPOV,
  SUCCESS_CREATE_UNMCUAS_ID,
  SUCCESS_UNMCAUS,
  REQUEST_GET_UNMCUAS_ID,
  SUCCESS_GET_UNMCUAS_ID,
  FAIL_GET_UNMCUAS_ID,
  SELECT_CURRENT_UNMCAUS,
  CLEAR_CURRENT_UNMCAUS,
  REQUEST_FINISH_UNMCAUS,
  SUCCESS_FINISH_UNMCAUS,
  FAIL_FINISH_UNMCAUS,
} from "../constants/UNMCAUSConstants";
import { getCookie } from "../utils/cookie";

export const getUNMCAUSData = (delegateID) => async (dispatch) => {
  try {
    // console.log(delegateID);
    dispatch({ type: REQUEST_UNMCAUS });
    const headers = getCookie();

    const { data } = await axios.get(`api/unmcaus`, {
      params: {
        id: delegateID,
      },
      headers: headers,
    });
    dispatch({
      type: SUCCESS_UNMCAUS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_UNMCAUS,
      payload: error.response.data.error,
    });
  }
};

export const addUNMCAUSData = (UNMCAUSRawData) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_ADD_UNMCAUS });
    const headers = getCookie();

    const { data } = await axios.post("/api/chair/add_unmd", UNMCAUSRawData, {
      headers: headers,
    });
    dispatch({
      type: SUCCESS_ADD_UNMCAUS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_ADD_UNMCAUS,
      payload: error.response.data.error,
    });
  }
};

// ChairPerson Fetch All UNMCAUS

export const getALLUNMCAUSDataChairPOV = () => async (dispatch,getState) => {
  try {
    dispatch({ type: REQUEST_ALL_UNMCAUS_CHAIRPOV });
    const headers = getCookie();
    const pendingCommitteeSessionId = getState().comm_session.pendingCommitteeSession.id;
  console.log(pendingCommitteeSessionId);

    const { data } = await axios.get(
      `/api/chair/add_unmd?community_session=${pendingCommitteeSessionId}`,
      {
        headers: headers,
      }
    );

    dispatch({
      type: SUCCESS_ALL_UNMCAUS_CHAIRPOV,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_ALL_UNMCAUS_CHAIRPOV,
      payload: error.response.data.error,
    });
  }
};

//create unmcaus id
// export const createUNMCAUSID = () => async (dispatch, getState) => {
//   try {
//     dispatch({ type: REQUEST_CREATE_UNMCUAS_ID });
//     const headers = getCookie();
//     const UNMCAUSRawData = {
//       community_session: getState().comm_session.pendingCommitteeSession.id,
//     };
//     const { data } = await axios.post(
//       `/api/chair/create_unmd`,
//       UNMCAUSRawData,
//       { headers: headers }
//     );

//     dispatch({
//       type: SUCCESS_CREATE_UNMCUAS_ID,
//       payload: data.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: FAIL_CREATE_UNMCUAS_ID,
//       payload: error.response.data.error,
//     });
//   }
// };

//get unmcaus id
// export const getUNMCAUSID = () => async (dispatch, getState) => {
//   try {
//     dispatch({ type: REQUEST_GET_UNMCUAS_ID });
//     const headers = getCookie();
//     const session = getState().comm_session.CommitteeSessionData[0].id;
//     const { data } = await axios.get(
//       `/api/chair/create_unmd?community_session=${session}`,
//       { headers: headers }
//     );

//     dispatch({
//       type: SUCCESS_GET_UNMCUAS_ID,
//       payload: data.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: FAIL_GET_UNMCUAS_ID,
//       payload: error.response.data.error,
//     });
//   }
// };

//finish unmcaus
export const finishUNMCAUS = (UNMCAUSRawData) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_FINISH_UNMCAUS });
    const headers = getCookie();
    const { data } = await axios.put(
      `/api/chair/add_unmd`,UNMCAUSRawData,
      { headers: headers }
    ); //make post request with unmcaus_id and status

    dispatch({
      type: SUCCESS_FINISH_UNMCAUS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_FINISH_UNMCAUS,
      payload: error.response.data.error,
    });
  }
};

//CURRENT UNMCAUS SELECTED
export const currentUNMCAUSSelected = (UNID) => async (dispatch) => {
  try {
    dispatch({ type: SELECT_CURRENT_UNMCAUS, payload: UNID });
  } catch (error) {
    console.log(error);
  }
};

//Clear Current UNMCAUS
// export const clearCurrentMACAUSSelected = () => async (dispatch) => {
//   try {
//     dispatch({ type: CLEAR_CURRENT_UNMCAUS, payload: null });
//   } catch (error) {
//     console.log(error);
//   }
// };

//clear msg
export const clearMessages = () => async (dispatch) => {
  try {
      dispatch({ type: CLEAR_MSG });
  } catch (error) {
      console.log(error);
  }
};

export const clearErrors = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_ERRORS });
  } catch (error) {
    console.log(error);
  }
};
