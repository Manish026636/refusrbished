import {
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
  FAIL_ADD_GSL,
  FAIL_ALL_GSL_CHAIRPOV,
  FAIL_GSL,
  REQUEST_ADD_GSL,
  REQUEST_ALL_GSL_CHAIRPOV,
  REQUEST_GSL,
  SUCCESS_ADD_GSL,
  SUCCESS_ALL_GSL_CHAIRPOV,
  SUCCESS_GSL,
  SELECT_CURRENT_GSL,
  CLEAR_CURRENT_GSL,
  REQUEST_GSL_COMMON_SETTINGS,
  SUCCESS_GSL_COMMON_SETTINGS,
  FAIL_GSL_COMMON_SETTINGS,
  SUCCESS_ADD_GSL_COMMON_SETTINGS,
  FAIL_ADD_GSL_COMMON_SETTINGS,
  REQUEST_ADD_GSL_COMMON_SETTINGS,
  REQUEST_SAVE_GSL_DETAILS,
  REQUEST_GET_GSL_DETAILS,
  SUCCESS_SAVE_GSL_DETAILS,
  SUCCESS_GET_GSL_DETAILS,
  FAIL_SAVE_GSL_DETAILS,
  FAIL_GET_GSL_DETAILS,
  REQUEST_START_GSL,
  SUCCESS_START_GSL,
  FAIL_START_GSL,
  REQUEST_GET_GSL_INFO_DETAILS,
  SUCCESS_GET_GSL_INFO_DETAILS,
} from "../constants/GSLConstants";

export const GSLReducer = (
  state = {
    isCurrentGSLSpeaker: null,
    GSLdata: [],
    GSLChairData: [],
    completedCurrentGSL: null,
    msg: "",
    GSLCommonSetting: {},
    GSLDetails: {},
    currentGSL: null
  },
  action
) => {
  switch (action.type) {
    case REQUEST_GSL_COMMON_SETTINGS:
    case REQUEST_GSL:
    case REQUEST_ADD_GSL:
    case REQUEST_ALL_GSL_CHAIRPOV:
    case REQUEST_ADD_GSL_COMMON_SETTINGS:
    case REQUEST_SAVE_GSL_DETAILS:
    case REQUEST_GET_GSL_DETAILS:
    case REQUEST_START_GSL:
    case REQUEST_GET_GSL_INFO_DETAILS:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_GSL:
      return {
        ...state,
        loading: false,
        GSLdata: action.payload,
      };
    case SUCCESS_GSL_COMMON_SETTINGS:
      return {
        ...state,
        loading: false,
        GSLCommonSetting: action.payload,
      };
    case SUCCESS_ADD_GSL_COMMON_SETTINGS:
      return {
        ...state,
        loading: false,
        GSLCommonSetting: action.payload.data,
        msg: action.payload.msg,
      };

    case SUCCESS_START_GSL:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
      };

    case SUCCESS_SAVE_GSL_DETAILS:
      return {
        ...state,
        loading: false,
        GSLDetails: action.payload,
        msg: "GSL Details Saved Successfully",
      };
    case SUCCESS_GET_GSL_DETAILS:
      return {
        ...state,
        loading: false,
        GSLDetails: action.payload,
        msg: "GSL Details Saved Successfully",
      };

    case SUCCESS_ADD_GSL:
      return {
        ...state,
        loading: false,
        msg: action.payload,
        GSLChairData: [action.payload],
      };
    case SUCCESS_ALL_GSL_CHAIRPOV:
      return {
        ...state,
        loading: false,
        GSLChairData: action.payload,
        isCurrentGSLSpeaker: action.payload.find((GSLSpeaker) => GSLSpeaker?.isCurrentGSL === true)
      };

    case SUCCESS_GET_GSL_INFO_DETAILS:
      return {
        ...state,
        loading: false,
        currentGSL: action.payload,
      }

    case FAIL_ALL_GSL_CHAIRPOV:
      return {
        ...state,
        loading: false,
        GSLChairData: [],
        error: action.payload,
      };

    case FAIL_GSL:
    case FAIL_ADD_GSL:
    case FAIL_ADD_GSL_COMMON_SETTINGS:
    case FAIL_GSL_COMMON_SETTINGS:
    case FAIL_SAVE_GSL_DETAILS:
    case FAIL_GET_GSL_DETAILS:
    case FAIL_START_GSL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        msg: "",
      };
    default:
      return state;
  }
};
