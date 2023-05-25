import {
  CLEAR_CAPTCHA,
  FAIL_CAPTCHA,
  REQUEST_CAPTCHA,
  SUCCESS_CAPTCHA,
} from "../constants/captchaConstants";
import { CLEAR_ERRORS } from "../constants/userConstants";

export const captchaReducer = (
  state = { id: "", captcha_text: "" },
  action
) => {
  switch (action.type) {
    case REQUEST_CAPTCHA:
      return {
        ...state,
        captchaLoading: true,
      };
    case SUCCESS_CAPTCHA:
      return {
        captchaLoading: false,
        id: action.payload.captcha_id,
        captcha_text: action.payload.captcha,
      };

    case CLEAR_CAPTCHA:
      return {
        captchaLoading: false,
        id: "",
        captcha_text: "",
      };

    case FAIL_CAPTCHA:
      return {
        captchaLoading: false,
        id: "",
        captcha_text: "",
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
