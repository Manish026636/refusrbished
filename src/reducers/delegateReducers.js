import {
  CLEAR_DELIGATES,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
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
} from "../constants/deligateConstants";

export const delegateReducer = (
  state = {
    loading: false,
    delegate: null,
    delegate_info: null,
    selected_community: "",
  
  },
  action
) => {
  switch (action.type) {
    case REQUEST_DELIGATES:
    case REQUEST_DELIGATE_JOIN:
    case REQUEST_DELIGATE_DETAILS:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_DELIGATES:
    case SUCCESS_DELIGATE_JOIN:
      return {
        ...state,
        loading: false,
        delegate_info: action.payload.data,
        msg: action.payload?.msg ? action.payload.msg : "",
      };
    case SUCCESS_DELIGATE_DETAILS:
      return {
        ...state,
        loading: false,
        delegate_info: action.payload,
      };

    case SELECT_COMMUNITY_ID:
      return {
        ...state,
        selected_community: action.payload,
      };

    case CLEAR_DELIGATES:
      return {
        ...state,
        delegate: null,
        selected_community: null,
        delegate_info: null,
      };
    case FAIL_DELIGATES:
    case FAIL_DELIGATE_JOIN:
    case FAIL_DELIGATE_DETAILS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        delegate: null,
        error: null,
      };
      case CLEAR_MESSAGES:
        return {
          ...state,
          msg:""
        };
    default:
      return state;
  }
};
