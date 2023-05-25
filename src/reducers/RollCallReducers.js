import {
  REQUEST_ROLL_CALL,
  REQUEST_ROLL_LIST,
  CLEAR_ERRORS,
  SUCCESS_ROLL_CALL,
  SUCCESS_ROLL_LIST,
  FAIL_ROLL_LIST,
  FAIL_ROLL_CALL,
  CLEAR_MESSAGES,
  REQUEST_MARKED_ROLL_LIST,
  FAIL_MARKED_ROLL_LIST,
  SUCCESS_MARKED_ROLL_LIST,
} from "../constants/RollCallConstants";

export const rollCallReducer = (
  state = { rollList: [], markedRollList: [], message: "" },
  action
) => {
  switch (action.type) {
    case REQUEST_ROLL_CALL:
    case REQUEST_ROLL_LIST:
    case REQUEST_MARKED_ROLL_LIST:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_ROLL_CALL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case SUCCESS_ROLL_LIST:
      return {
        ...state,
        loading: false,
        rollList: action.payload,
      };

    case SUCCESS_MARKED_ROLL_LIST:
      return {
        ...state,
        loading: false,
        markedRollList: action.payload,
      };
    case FAIL_ROLL_LIST:
    case FAIL_ROLL_CALL:
    case FAIL_MARKED_ROLL_LIST:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_MESSAGES:
      return {
        ...state,
        message: null,
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
