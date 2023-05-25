import axios from "axios";
import {
  CLEAR_ERRORS,
  FAIL_COMMITTEE_REPORT,
  REQUEST_COMMITTEE_REPORT,
  SUCCESS_COMMITTEE_REPORT,
} from "../constants/reportConstants";
import { getCookie } from "../utils/cookie";
//captcha action
export const reportAction = (comm) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_COMMITTEE_REPORT });
    const headers = getCookie();

    const { data } = await axios.get(
      `/api/chair/report?comm_id=${comm}&query=all`,
      {
        headers: headers,
      }
    );
    dispatch({
      type: SUCCESS_COMMITTEE_REPORT,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_COMMITTEE_REPORT,
      payload: error.response.data.error,
    });
  }
};

//clear error

export const clearErrors = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_ERRORS });
  } catch (error) {
    console.log(error);
  }
};