import {
  CLEAR_ERRORS,
  CLEAR_MCAUS_ID,
  CLEAR_MESSAGES,
  FAIL_ADD_MCAUS,
  FAIL_ADD_MCAUSID,
  FAIL_ALL_MCAUS_CHAIRPOV,
  FAIL_GET_MCAUSID,
  FAIL_GET_MCAUS_DELEGATE_SPEAKER_INFO_DETAILS,
  FAIL_GET_MCAUS_DETAILS,
  FAIL_GET_MCAUS_SPEAKER_DETAILS,
  FAIL_MCAUS,
  FAIL_SAVE_MCAUS_CHAIRPOV,
  FAIL_SAVE_MCAUS_DETAILS,
  FAIL_SAVE_MCAUS_SPEAKER_DETAILS,
  FAIL_UPDATE_MCAUSID,
  FAIL_UPDATE_MCAUS_SPEAKER_INFO_DETAILS,
  REQUEST_ADD_MCAUS,
  REQUEST_ADD_MCAUSID,
  REQUEST_ALL_MCAUS_CHAIRPOV,
  REQUEST_GET_MCAUSID,
  REQUEST_GET_MCAUS_DELEGATE_SPEAKER_INFO_DETAILS,
  REQUEST_GET_MCAUS_DETAILS,
  REQUEST_GET_MCAUS_SPEAKER_DETAILS,
  REQUEST_MCAUS,
  REQUEST_SAVE_MCAUS_CHAIRPOV,
  REQUEST_SAVE_MCAUS_DETAILS,
  REQUEST_SAVE_MCAUS_SPEAKER_DETAILS,
  REQUEST_UPDATE_MCAUSID,
  REQUEST_UPDATE_MCAUS_SPEAKER_INFO_DETAILS,
  SUCCESS_ADD_MCAUS,
  SUCCESS_ADD_MCAUSID,
  SUCCESS_ALL_MCAUS_CHAIRPOV,
  SUCCESS_GET_MCAUSID,
  SUCCESS_GET_MCAUS_DELEGATE_SPEAKER_INFO_DETAILS,
  SUCCESS_GET_MCAUS_DETAILS,
  SUCCESS_GET_MCAUS_SPEAKER_DETAILS,
  SUCCESS_MCAUS,
  SUCCESS_SAVE_MCAUS_CHAIRPOV,
  SUCCESS_SAVE_MCAUS_DETAILS,
  SUCCESS_SAVE_MCAUS_SPEAKER_DETAILS,
  SUCCESS_UPDATE_MCAUSID,
  SUCCESS_UPDATE_MCAUS_SPEAKER_INFO_DETAILS,
} from "../constants/MCAUSConstants";
import {
  FAIL_GET_PASSED_VOTING_TOPIC_CHAIR,
  REQUEST_GET_PASSED_VOTING_TOPIC_CHAIR,
  SUCCESS_GET_PASSED_VOTING_TOPIC_CHAIR,
} from "../constants/voteConstants";

export const MCAUSReducer = (
  state = {
    MCAUSdata: [],
    isCurrentMCAUSSpeaker: null,
    msg: "",
    MCAUSIdDetails: [],
    MCAUSDetails: {},
    MCAUSChairDetails: [],
    pendingMCAUSId: {},
    MCAUSSpeakers: [],
    passedVotingTopic: null,
    currentCompletedMCAUSSpeaker: null,
  },
  action
) => {
  switch (action.type) {
    case REQUEST_MCAUS:
    case REQUEST_ADD_MCAUS:
    case REQUEST_ADD_MCAUSID:
    case REQUEST_GET_MCAUS_DETAILS:
    case REQUEST_SAVE_MCAUS_DETAILS:
    case REQUEST_GET_MCAUSID:
    case REQUEST_ALL_MCAUS_CHAIRPOV:
    case REQUEST_SAVE_MCAUS_CHAIRPOV:
    case REQUEST_GET_MCAUS_SPEAKER_DETAILS:
    case REQUEST_UPDATE_MCAUSID:
    case REQUEST_SAVE_MCAUS_SPEAKER_DETAILS:
    case REQUEST_GET_MCAUS_DELEGATE_SPEAKER_INFO_DETAILS:
    case REQUEST_GET_PASSED_VOTING_TOPIC_CHAIR:
    case REQUEST_UPDATE_MCAUS_SPEAKER_INFO_DETAILS:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_MCAUS:
      return {
        ...state,
        loading: false,
        MCAUSdata: action.payload,
      };
    case SUCCESS_SAVE_MCAUS_DETAILS:
    case SUCCESS_GET_MCAUS_DETAILS:
      return {
        ...state,
        loading: false,
        MCAUSDetails: action.payload,
      };
    case SUCCESS_ADD_MCAUS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };

    case SUCCESS_SAVE_MCAUS_CHAIRPOV:
      return {
        ...state,
        loading: false,
        MCAUSChairDetails: [action.payload, ...state.MCAUSChairDetails],
      };

    case SUCCESS_ALL_MCAUS_CHAIRPOV:
      return {
        ...state,
        loading: false,
        MCAUSChairDetails: action.payload,
      };
    case SUCCESS_ADD_MCAUSID:
      return {
        ...state,
        loading: false,
        MCAUSIdDetails: [action.payload],
        pendingMCAUSId: action.payload,
        msg: "Request for MCAUS ID successful",
      };

    case SUCCESS_UPDATE_MCAUSID:
      return {
        ...state,
        loading: false,
        MCAUSIdDetails: [action.payload],
        pendingMCAUSId: action.payload,
        msg:
          action.payload?.stage === 1
            ? "MCAUS Id created for this session"
            : action.payload?.stage === 2
            ? "Motions added successfully"
            : action.payload?.stage === 4
            ? "Voting on motions completed"
            : "",
      };

    case SUCCESS_GET_MCAUSID:
      return {
        ...state,
        loading: false,
        MCAUSIdDetails: action.payload,
        pendingMCAUSId: action.payload.find(
          (mcausId) => mcausId.is_active === true
        ),
      };

    case SUCCESS_SAVE_MCAUS_SPEAKER_DETAILS:
      return {
        ...state,
        loading: false,
        MCAUSSpeakers: action.payload.data,
        msg: action.payload.msg,
      };

    case SUCCESS_GET_MCAUS_SPEAKER_DETAILS:
      return {
        ...state,
        loading: false,
        MCAUSSpeakers: action.payload,
        isCurrentMCAUSSpeaker: action.payload.find(
          (mcaus_speaker) =>
            mcaus_speaker.status === "not_started" ||
            mcaus_speaker.status === "pending"
        ),
      };
    case SUCCESS_GET_PASSED_VOTING_TOPIC_CHAIR:
      return {
        ...state,
        loading: false,
        passedVotingTopic: action.payload.data,
      };
    case SUCCESS_UPDATE_MCAUS_SPEAKER_INFO_DETAILS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
      };
    case SUCCESS_GET_MCAUS_DELEGATE_SPEAKER_INFO_DETAILS:
      return {
        ...state,
        loading: false,
        currentCompletedMCAUSSpeaker: action.payload.data,
      };

    case CLEAR_MCAUS_ID:
      return {
        ...state,
        loading: false,
        MCAUSIdDetails: [],
        pendingMCAUSId: null,
      };
    case FAIL_GET_MCAUS_SPEAKER_DETAILS:
    case FAIL_ADD_MCAUSID:
    case FAIL_MCAUS:
    case FAIL_ADD_MCAUS:
    case FAIL_SAVE_MCAUS_DETAILS:
    case FAIL_GET_MCAUS_DETAILS:
    case FAIL_GET_MCAUSID:
    case FAIL_ALL_MCAUS_CHAIRPOV:
    case FAIL_SAVE_MCAUS_CHAIRPOV:
    case FAIL_SAVE_MCAUS_SPEAKER_DETAILS:
    case FAIL_UPDATE_MCAUSID:
    case FAIL_GET_PASSED_VOTING_TOPIC_CHAIR:
    case FAIL_UPDATE_MCAUS_SPEAKER_INFO_DETAILS:
    case FAIL_GET_MCAUS_DELEGATE_SPEAKER_INFO_DETAILS:
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
