import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducers";
import { captchaReducer } from "./reducers/captchaReducers";
import { delegateReducer } from "./reducers/delegateReducers";
import { GSLReducer } from "./reducers/GSLReducers";
import { voteReducer } from "./reducers/voteReducers";
import { MCAUSReducer } from "./reducers/MCAUSReducers";
import { UNMCAUSReducer } from "./reducers/UNMCAUSReducers";
import { committeeSessionReducers } from "./reducers/committeeSessionReducers";
import { rollCallReducer } from "./reducers/RollCallReducers";
import { reportReducer } from "./reducers/reportReducers";

const reducer = combineReducers({
  user: userReducer,
  captcha: captchaReducer,
  delegate_details: delegateReducer,
  GSL: GSLReducer,
  MCAUS: MCAUSReducer,
  UNMCAUS: UNMCAUSReducer,
  vote: voteReducer,
  comm_session: committeeSessionReducers,
  roll_call: rollCallReducer,
  report: reportReducer
});

let initialState = {
  user: {
    loading: false,
    user: {},
    is_authenticated: false,
  },
};
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);
export default store;
