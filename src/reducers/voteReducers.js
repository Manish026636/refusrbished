import {
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
  FAIL_DO_CHAIR_VOTE,
  FAIL_DO_VOTE,
  FAIL_GET_ALL_RESULT_CHAIR,
  FAIL_GET_CHAIR_TOPICS,
  FAIL_GET_RESULT_CHAIR,
  FAIL_PENDING_MARKED_DELEGATES,
  REQUEST_DO_CHAIR_VOTE,
  REQUEST_DO_VOTE,
  REQUEST_GET_ALL_RESULT_CHAIR,
  REQUEST_GET_CHAIR_TOPICS,
  REQUEST_GET_RESULT_CHAIR,
  REQUEST_PENDING_MARKED_DELEGATES,
  SUCCESS_DO_CHAIR_VOTE,
  SUCCESS_DO_VOTE,
  SUCCESS_GET_ALL_RESULT_CHAIR,
  SUCCESS_GET_CHAIR_TOPICS,
  SUCCESS_GET_RESULT_CHAIR,
  SUCCESS_PENDING_MARKED_DELEGATES,
} from "../constants/voteConstants";

export const voteReducer = (
  state = {
    pendingMarkedDelegates: [],
    msg: "",
    chairVotes: [],
    passedVotingTopic: null,
    pendingVotingTopic: null,
    votingResult: [],
    votingResults:[]
  },
  action
) => {
  switch (action.type) {
    case REQUEST_DO_VOTE:
    case REQUEST_DO_CHAIR_VOTE:
    case REQUEST_GET_CHAIR_TOPICS:
    case REQUEST_PENDING_MARKED_DELEGATES:
    case REQUEST_GET_ALL_RESULT_CHAIR:
    case REQUEST_GET_RESULT_CHAIR:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_DO_VOTE:
      return {
        ...state,
        loading: false,
        vote: action.payload.data,
        msg: action.payload.msg,
      };

    case SUCCESS_GET_ALL_RESULT_CHAIR:
      return {
        ...state,
        loading: false,
        votingResults: action.payload,
        passedVotingTopic:action.payload.find((voteTopic)=>voteTopic.topic.is_pass==="passed"),
        pendingVotingTopic: action.payload.find((voteTopic)=>voteTopic.topic.is_pass==="passed")?null: action.payload.find(voteTopic=>voteTopic.topic.is_pass==="pending")
      };
      case SUCCESS_GET_RESULT_CHAIR:
        return {
          ...state,
          loading: false,
          votingResult: action.payload.data,
        };
    case SUCCESS_DO_CHAIR_VOTE:
      return {
        ...state,
        loading: false,
        chairVotes: action.payload.data,
        msg: action.payload.msg,
      };
    // case SUCCESS_GET_CHAIR_TOPICS:
    //   return {
    //     ...state,
    //     passedVotingTopic: action.payload.find(
    //       (chairTopic) => chairTopic.is_pass === "passed"
    //     ),
    //     pendingVotingTopic: action.payload.filter(
    //       (item) => item.is_pass === "passed"
    //     ).length
    //       ? null
    //       : action.payload.find(
    //           (chairTopic) => chairTopic.is_pass === "pending"
    //         ),
    //     loading: false,

    //     chairVotes: action.payload,
    //   };
    case SUCCESS_PENDING_MARKED_DELEGATES:
      return {
        ...state,
        loading: false,
        pendingMarkedDelegates: action.payload,
      };

    case FAIL_DO_VOTE:
    case FAIL_DO_CHAIR_VOTE:
    case FAIL_GET_CHAIR_TOPICS:
    case FAIL_PENDING_MARKED_DELEGATES:
    case FAIL_GET_ALL_RESULT_CHAIR:
      case FAIL_GET_RESULT_CHAIR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_MESSAGES:
      return {
        ...state,
        msg: "",
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
