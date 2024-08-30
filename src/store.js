import { thunk } from "redux-thunk";
import rootReducers from "./reducers";
import { createStore, applyMiddleware } from "redux";

const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;
