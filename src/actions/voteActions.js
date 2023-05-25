import axios from "axios";
import {
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
  FAIL_DO_CHAIR_VOTE,
  FAIL_DO_VOTE,
  FAIL_GET_ALL_RESULT_CHAIR,
  FAIL_GET_CHAIR_TOPICS,
  FAIL_GET_PASSED_VOTING_TOPIC_CHAIR,
  FAIL_GET_RESULT_CHAIR,
  FAIL_PENDING_MARKED_DELEGATES,
  REQUEST_DO_CHAIR_VOTE,
  REQUEST_DO_VOTE,
  REQUEST_GET_ALL_RESULT_CHAIR,
  REQUEST_GET_CHAIR_TOPICS,
  REQUEST_GET_PASSED_VOTING_TOPIC_CHAIR,
  REQUEST_GET_RESULT_CHAIR,
  REQUEST_PENDING_MARKED_DELEGATES,
  SUCCESS_DO_CHAIR_VOTE,
  SUCCESS_DO_VOTE,
  SUCCESS_GET_ALL_RESULT_CHAIR,
  SUCCESS_GET_CHAIR_TOPICS,
  SUCCESS_GET_PASSED_VOTING_TOPIC_CHAIR,
  SUCCESS_GET_RESULT_CHAIR,
  SUCCESS_PENDING_MARKED_DELEGATES,
} from "../constants/voteConstants";
import { getCookie } from "../utils/cookie";

//fetch all the marked delegates left for voting
export const fetchPendingMarkedDelegates =
  (topicId, session) => async (dispatch, getState) => {
    try {
      dispatch({ type: REQUEST_PENDING_MARKED_DELEGATES });
      const headers = getCookie();
      const { data } = await axios.get(
        `/api/chair/vote?topic=${topicId}&session=${session}`,
        { headers: headers }
      );

      dispatch({
        type: SUCCESS_PENDING_MARKED_DELEGATES,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: FAIL_PENDING_MARKED_DELEGATES,
        payload: error.response.data.error,
      });
    }
  };

// Delagtes Voting on a Motion Topic
export const voteAction = (val) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_DO_VOTE });
    const headers = getCookie();
    const { data } = await axios.post("/api/chair/vote", val, {
      headers: headers,
    });
    dispatch({
      type: SUCCESS_DO_VOTE,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_DO_VOTE,
      payload: error.response.data.error,
    });
  }
};

// vote on topic chair
export const voteChairAction = (val) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_DO_CHAIR_VOTE });
    const headers = getCookie();
    const { data } = await axios.put("/api/chair/topics", val, {
      headers: headers,
    });
    dispatch({
      type: SUCCESS_DO_CHAIR_VOTE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_DO_CHAIR_VOTE,
      payload: error.response.data.error,
    });
  }
};

//get all topic chair
export const getChairTopicsAction =
  (mcuas, shorted = false) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: REQUEST_GET_CHAIR_TOPICS });
      const headers = getCookie();
      const { data } = await axios.get(
        `/api/chair/topics?mcausid=${mcuas}${
          shorted ? "&shortResult=yes" : ""
        }`,
        { headers: headers }
      );
      dispatch({
        type: SUCCESS_GET_CHAIR_TOPICS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: FAIL_GET_CHAIR_TOPICS,
        payload: error.response.data.error,
      });
    }
  };

// get all result chair
export const getAllResultChairAction =
  (session,mcaus_id) => async (dispatch, getState) => {
    try {
      dispatch({ type: REQUEST_GET_ALL_RESULT_CHAIR });
      const headers = getCookie();
      const { data } = await axios.get(`/api/chair/all_result?session=${session}&mcaus_id=${mcaus_id}`,{
        headers: headers,
      });
      dispatch({
        type: SUCCESS_GET_ALL_RESULT_CHAIR,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: FAIL_GET_ALL_RESULT_CHAIR,
        payload: error.response.data.error,
      });
    }
  };


  // get result for one voting topic 
  export const getResultChairAction =
  (session,mcaus) => async (dispatch, getState) => {
    try {
      dispatch({ type: REQUEST_GET_RESULT_CHAIR });
      const headers = getCookie();
      const { data } = await axios.get(`/api/chair/result?session=${session}&mcaus=${mcaus}`, {
        headers: headers,
      });
      dispatch({
        type: SUCCESS_GET_RESULT_CHAIR,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FAIL_GET_RESULT_CHAIR,
        payload: error.response.data.error,
      });
    }
  };

  //getPassedVoingTopic

  export const getPassedVotingTopicChair =
  (session,mcaus) => async (dispatch, getState) => {
    try {
      dispatch({ type: REQUEST_GET_PASSED_VOTING_TOPIC_CHAIR });
      const headers = getCookie();
      const { data } = await axios.get(`/api/chair/result?session=${session}&mcaus=${mcaus}&filter=passed`, {
        headers: headers,
      });
      dispatch({
        type: SUCCESS_GET_PASSED_VOTING_TOPIC_CHAIR,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FAIL_GET_PASSED_VOTING_TOPIC_CHAIR,

        payload: error.response.data.error,
      });
    }
  };

// clear messages
export const clearMessagesVotes = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_MESSAGES });
  } catch (error) {
    console.log(error);
  }
};
export const clearErrorsVotes = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_ERRORS });
  } catch (error) {
    console.log(error);
  }
};
