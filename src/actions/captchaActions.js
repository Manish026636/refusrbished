import axios from 'axios'
import { FAIL_CAPTCHA, REQUEST_CAPTCHA, SUCCESS_CAPTCHA } from '../constants/captchaConstants';
//captcha action
export const captchaAction = () => async (dispatch) => {
    try {
      dispatch({ type: REQUEST_CAPTCHA });
      const headers = {Accept: "application/json"}
  
      const { data } = await axios.post("api/generate_captcha", headers);
      dispatch({
        type: SUCCESS_CAPTCHA,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: FAIL_CAPTCHA,
        payload: error.response.data.error,
      });
    }
  };