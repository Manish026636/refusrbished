import {
  CLEAR_ERRORS,
  FAIL_COMMITTEE_REPORT,
  REQUEST_COMMITTEE_REPORT,
  SUCCESS_COMMITTEE_REPORT,
} from "../constants/reportConstants";

export const reportReducer = (state = { report: [] }, action) => {
  switch (action.type) {
    case REQUEST_COMMITTEE_REPORT:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_COMMITTEE_REPORT:
      return {
        loading: false,
        report: action.payload,
      };

    case FAIL_COMMITTEE_REPORT:
      return {
        ...state,
        loading: false,
        report: [],
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
