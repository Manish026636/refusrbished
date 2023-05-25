import {
  CLEAR_ERRORS,
  CLEAR_MSG,
  FAIL_ADD_UNMCAUS,
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
  FAIL_ALL_UNMCAUS_CHAIRPOV
} from "../constants/UNMCAUSConstants";

export const UNMCAUSReducer = (
  state = {
    UNMCAUSdata: [],
    UNMCAUSChairdata: [],
    UNMDID: {},
    currentUNMCAUS: {},
    msg: "",
  },
  action
) => {
  switch (action.type) {
    case REQUEST_UNMCAUS:
    case REQUEST_ADD_UNMCAUS:
    case REQUEST_ALL_UNMCAUS_CHAIRPOV:
    case REQUEST_CREATE_UNMCUAS_ID:
    case REQUEST_GET_UNMCUAS_ID:
    case REQUEST_FINISH_UNMCAUS:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_UNMCAUS:
    case SUCCESS_FINISH_UNMCAUS:
      return {
        ...state,
        loading: false,
        UNMCAUSdata: action.payload.data,
        msg:action.payload.msg
      };
    case SUCCESS_ADD_UNMCAUS:
      return {
        ...state,
        loading: false,
        UNMCAUSdata: action.payload.data,
        msg: action.payload.msg
      };
    case SUCCESS_CREATE_UNMCUAS_ID:
    case SUCCESS_GET_UNMCUAS_ID:
      return {
        ...state,
        loading: false,
        UNMDID: action.payload,
      };

    case SUCCESS_ALL_UNMCAUS_CHAIRPOV:
      return {
        ...state,
        loading: false,
        UNMCAUSChairdata: action.payload,
      };

    case SELECT_CURRENT_UNMCAUS:
      return {
        ...state,
        currentUNMCAUS: action.payload,
      };

    case CLEAR_CURRENT_UNMCAUS:
      return {
        ...state,
        currentUNMCAUS: {},
      };

    case FAIL_GET_UNMCUAS_ID:
      return {
        ...state,
        loading: false,
        UNMDID: {},
        error: action.payload

      }

    case FAIL_ALL_UNMCAUS_CHAIRPOV:
      return {
        ...state,
        loading: false,
        UNMCAUSChairdata: [],
        error: action.payload.error
      }

    case FAIL_UNMCAUS:
    case FAIL_ADD_UNMCAUS:
    case FAIL_CREATE_UNMCUAS_ID:
    case FAIL_FINISH_UNMCAUS:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case CLEAR_MSG:
      return {
        ...state,
        msg: null
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
