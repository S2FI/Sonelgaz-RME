import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import planningReducer from "./reducers/planningReducer";

const middlewares = [thunk];
const Reducers = combineReducers({
  authReducer: authReducer,
  planningReducer: planningReducer,
});
export default createStore(Reducers, compose(applyMiddleware(...middlewares)));
