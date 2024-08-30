import { combineReducers } from "redux";
import postReducer from "./PostReducer";
import followReducer from "./FollowReducer";
import profileReucer from "./ProfileReducer";

const rootReducers = combineReducers({
  postsData: postReducer,
  profileData: profileReucer,
  followData: followReducer,
});

export default rootReducers;