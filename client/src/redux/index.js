import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";

const middlewares = [thunk];
const Reducers = combineReducers({
  authReducer: authReducer,
});
export default createStore(Reducers, compose(applyMiddleware(...middlewares)));
