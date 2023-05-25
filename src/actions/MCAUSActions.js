import axios from "axios";

import { getCookie } from "../utils/cookie";
import {
  CLEAR_ERRORS,
  CLEAR_MCAUS_ID,
  CLEAR_MESSAGES,
  FAIL_ADD_MCAUSID,
  FAIL_ALL_MCAUS_CHAIRPOV,
  FAIL_GET_MCAUSID,
  FAIL_GET_MCAUS_DELEGATE_SPEAKER_INFO_DETAILS,
  FAIL_GET_MCAUS_SPEAKER_DETAILS,
  FAIL_SAVE_MCAUS_CHAIRPOV,
  FAIL_SAVE_MCAUS_DETAILS,
  FAIL_SAVE_MCAUS_SPEAKER_DETAILS,
  FAIL_UPDATE_MCAUSID,
  FAIL_UPDATE_MCAUS_SPEAKER_INFO_DETAILS,
  REQUEST_ADD_MCAUSID,
  REQUEST_ALL_MCAUS_CHAIRPOV,
  REQUEST_GET_MCAUSID,
  REQUEST_GET_MCAUS_DELEGATE_SPEAKER_INFO_DETAILS,
  REQUEST_GET_MCAUS_SPEAKER_DETAILS,
  REQUEST_SAVE_MCAUS_CHAIRPOV,
  REQUEST_SAVE_MCAUS_DETAILS,
  REQUEST_SAVE_MCAUS_SPEAKER_DETAILS,
  REQUEST_UPDATE_MCAUSID,
  REQUEST_UPDATE_MCAUS_SPEAKER_INFO_DETAILS,
  SUCCESS_ADD_MCAUSID,
  SUCCESS_ALL_MCAUS_CHAIRPOV,
  SUCCESS_GET_MCAUSID,
  SUCCESS_GET_MCAUS_DELEGATE_SPEAKER_INFO_DETAILS,
  SUCCESS_GET_MCAUS_SPEAKER_DETAILS,
  SUCCESS_SAVE_MCAUS_CHAIRPOV,
  SUCCESS_SAVE_MCAUS_DETAILS,
  SUCCESS_SAVE_MCAUS_SPEAKER_DETAILS,
  SUCCESS_UPDATE_MCAUSID,
  SUCCESS_UPDATE_MCAUS_SPEAKER_INFO_DETAILS,
} from "../constants/MCAUSConstants";

// Get MCAUS ID
export const getMCAUSId = (community_session) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_GET_MCAUSID });
    const headers = getCookie();

    const { data } = await axios.get("/api/chair/md_id", {
      params: {
        community_session: community_session,
      },
      headers: headers,
    });
    dispatch({
      type: SUCCESS_GET_MCAUSID,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_GET_MCAUSID,
      payload: error.response.data.error,
    });
  }
};

// Add MCAUS Id

export const addMCAUSId = (community_session) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_ADD_MCAUSID });
    const headers = getCookie();

    const { data } = await axios.post(
      "/api/chair/md_id",
      community_session,
      headers
    );
    dispatch({
      type: SUCCESS_ADD_MCAUSID,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_ADD_MCAUSID,
      payload: error.response.data.error,
    });
  }
};

// Patch MCAUS Id
export const putMCAUSId = (currentPendingMCAUSIdObj) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_UPDATE_MCAUSID });
    const headers = getCookie();

    const { data } = await axios.put(
      "/api/chair/md_id",
      currentPendingMCAUSIdObj,
      headers
    );
    dispatch({
      type: SUCCESS_UPDATE_MCAUSID,
      payload: data.data,
    });
    if (currentPendingMCAUSIdObj?.stage === 6) {
      dispatch({ type: CLEAR_MCAUS_ID });
    }
  } catch (error) {
    dispatch({
      type: FAIL_UPDATE_MCAUSID,
      payload: error.response.data.error,
    });
  }
};

// udate status

export const putMCAUSDeleagateSpeakerStatus =
  (currentPendingMCAUSSpeakerStatusObj) => async (dispatch) => {
    try {
      dispatch({ type: REQUEST_UPDATE_MCAUS_SPEAKER_INFO_DETAILS });
      const headers = getCookie();

      const { data } = await axios.put(
        "/api/chair/status_md",
        currentPendingMCAUSSpeakerStatusObj,
        {headers: headers}
      );
      dispatch({
        type: SUCCESS_UPDATE_MCAUS_SPEAKER_INFO_DETAILS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FAIL_UPDATE_MCAUS_SPEAKER_INFO_DETAILS,
        payload: error.response.data.error,
      });
    }
  };

//Put Delegate Speaker

export const putMCAUSDeleagateSpeakerInfo =
  (MCAUSDeleagateSpeakerInfo) => async (dispatch) => {
    try {
      dispatch({ type: REQUEST_UPDATE_MCAUS_SPEAKER_INFO_DETAILS });
      const headers = getCookie();

      const { data } = await axios.put(
        "/api/chair/speaker_md",
        MCAUSDeleagateSpeakerInfo,
        {headers: headers}
      );
      dispatch({
        type: SUCCESS_UPDATE_MCAUS_SPEAKER_INFO_DETAILS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FAIL_UPDATE_MCAUS_SPEAKER_INFO_DETAILS,
        payload: error.response.data.error,
      });
    }
  };
export const getMCAUSDeleagateSpeakerInfo = (speaker) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_GET_MCAUS_DELEGATE_SPEAKER_INFO_DETAILS });
    const headers = getCookie();

    const { data } = await axios.get(
      `/api/chair/speaker_md?speaker=${speaker}`,

      { headers: headers }
    );
    dispatch({
      type: SUCCESS_GET_MCAUS_DELEGATE_SPEAKER_INFO_DETAILS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_GET_MCAUS_DELEGATE_SPEAKER_INFO_DETAILS,
      payload: error.response.data.error,
    });
  }
};

export const addMCAUSSpeakerData = (MCAUSSpeakersData) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_SAVE_MCAUS_SPEAKER_DETAILS });
    const headers = getCookie();

    const { data } = await axios.post("/api/chair/info_md", MCAUSSpeakersData, {
      headers: headers,
    });
    dispatch({
      type: SUCCESS_SAVE_MCAUS_SPEAKER_DETAILS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_SAVE_MCAUS_SPEAKER_DETAILS,
      payload: error.response.data.error,
    });
  }
};

export const getMCAUSSpeakerData = (topic) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_GET_MCAUS_SPEAKER_DETAILS });
    const headers = getCookie();

    const { data } = await axios.get(`/api/chair/info_md?topic=${topic}`, {
      headers: headers,
    });
    dispatch({
      type: SUCCESS_GET_MCAUS_SPEAKER_DETAILS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_GET_MCAUS_SPEAKER_DETAILS,
      payload: error.response.data.error,
    });
  }
};

// export const addMCAUSData = (MCAUSRawData) => async (dispatch) => {
//   try {
//     dispatch({ type: REQUEST_ADD_MCAUS });
//     const headers = getCookie();

//     const { data } = await axios.post("/api/chair/info_md", MCAUSRawData, {
//       headers: headers,
//     });
//     dispatch({
//       type: SUCCESS_ADD_MCAUS,
//       payload: data.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: FAIL_ADD_MCAUS,
//       payload: error.response.data.error,
//     });
//   }
// };

// ChairPerson Fetch All MCAUS

export const getALLMCAUSDataChairPOV = (cal) => async (dispatch, getState) => {
  try {
    dispatch({ type: REQUEST_ALL_MCAUS_CHAIRPOV });
    const headers = getCookie();
    const pendingMCAUSId = getState().MCAUS.pendingMCAUSId.id;
    const { data } = await axios.get(
      `/api/chair/add_md?mcausid=${pendingMCAUSId}${cal ? "&result=true" : ""}`,
      {
        headers: headers,
      }
    );
    dispatch({
      type: SUCCESS_ALL_MCAUS_CHAIRPOV,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_ALL_MCAUS_CHAIRPOV,
      payload: error.response.data.error,
    });
  }
};

//save MCAUS Details chair POV
export const saveMCAUSDataChairPOV = (MCAUSRawData) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_SAVE_MCAUS_CHAIRPOV });
    const headers = getCookie();
    const { data } = await axios.post("/api/chair/add_md", MCAUSRawData, {
      headers: headers,
    });
    dispatch({
      type: SUCCESS_SAVE_MCAUS_CHAIRPOV,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_SAVE_MCAUS_CHAIRPOV,
      payload: error.response.data.error,
    });
  }
};

//save MCAUS Details
export const saveMCAUSData = (MCAUSRawData) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_SAVE_MCAUS_DETAILS });
    const headers = getCookie();

    const { data } = await axios.post("/api/chair/info_md", MCAUSRawData, {
      headers: headers,
    });
    //make a post request with mcaus, timeTaken, ratings, notes, comments
    dispatch({
      type: SUCCESS_SAVE_MCAUS_DETAILS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_SAVE_MCAUS_DETAILS,
      payload: error.response.data.error,
    });
  }
};

//get MCAUS Info Details
// export const getMCAUSData = (mcaus) => async (dispatch) => {
//   try {
//     dispatch({ type: REQUEST_GET_MCAUS_DETAILS });
//     const headers = getCookie();

//     const { data } = await axios.get(`/api/chair/info_md?mcaus=${mcaus}`, {
//       headers: headers,
//     });
//     dispatch({
//       type: SUCCESS_GET_MCAUS_DETAILS,
//       payload: data.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: FAIL_GET_MCAUS_DETAILS,
//       payload: error.response.data.error,
//     });
//   }
// };

export const clearErrors = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_ERRORS });
  } catch (error) {
    console.log(error);
  }
};

//MCAUS Delegate Speaker Info

export const getMCAUSSpeakerInfo = (mcaus_info_id) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_GET_MCAUS_DELEGATE_SPEAKER_INFO_DETAILS });
    const headers = getCookie();
    const { data } = await axios.get(
      `/api/chair/info_md?mcaus_info=${mcaus_info_id}`,
      {
        headers: headers,
      }
    );
    dispatch({
      type: SUCCESS_GET_MCAUS_DELEGATE_SPEAKER_INFO_DETAILS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_GET_MCAUS_DELEGATE_SPEAKER_INFO_DETAILS,
      payload: error.response.data.error,
    });
  }
};

//clear messages
export const clearMessages = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_MESSAGES });
  } catch (error) {
    console.log(error);
  }
};
