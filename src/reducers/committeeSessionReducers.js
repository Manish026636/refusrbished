import {
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
  FAIL_ADD_COMMITTEE_SESSION,
  FAIL_ALL_COMMITTEE_SESSION_CHAIRPOV,
  FAIL_COMMITTEE_SESSION,
  FAIL_TERMINATE_COMMITTEE_SESSION,
  REQUEST_ADD_COMMITTEE_SESSION,
  REQUEST_ALL_COMMITTEE_SESSION_CHAIRPOV,
  REQUEST_COMMITTEE_SESSION,
  REQUEST_TERMINATE_COMMITTEE_SESSION,
  SUCCESS_ADD_COMMITTEE_SESSION,
  SUCCESS_ALL_COMMITTEE_SESSION_CHAIRPOV,
  SUCCESS_COMMITTEE_SESSION,
  SUCCESS_TERMINATE_COMMITTEE_SESSION,
} from "../constants/committeeSessions";

export const committeeSessionReducers = (
  state = { CommitteeSessionData: [], msg: "" , pendingCommitteeSession: {}},
  action
) => {
  switch (action.type) {
    case REQUEST_COMMITTEE_SESSION:
    case REQUEST_ADD_COMMITTEE_SESSION:
    case REQUEST_ALL_COMMITTEE_SESSION_CHAIRPOV:
    case REQUEST_TERMINATE_COMMITTEE_SESSION:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_COMMITTEE_SESSION:
    case SUCCESS_ALL_COMMITTEE_SESSION_CHAIRPOV:
      return {
        loading: false,
        CommitteeSessionData: action.payload,
        pendingCommitteeSession: action.payload?.length>0 ? action.payload.find(
          (committee) => committee.is_active === true
        ):{},
      };
    case SUCCESS_ADD_COMMITTEE_SESSION:
      return {
        ...state,
        CommitteeSessionData: [action.payload],
        pendingCommitteeSession: action.payload,
        loading: false,
        msg: 'Session Created Successfully',
      };
    case SUCCESS_TERMINATE_COMMITTEE_SESSION:
      return {
        ...state,
        loading: false,
        CommitteeSessionData: [],
        msg: action.payload,
      };

    case FAIL_COMMITTEE_SESSION:
    case FAIL_ADD_COMMITTEE_SESSION:
    case FAIL_ALL_COMMITTEE_SESSION_CHAIRPOV:
    case FAIL_TERMINATE_COMMITTEE_SESSION:
      return {
        ...state,
        CommitteeSessionData: [],
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
