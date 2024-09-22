import postReducer from "./PostReducer";
import { combineReducers } from "redux";
import followReducer from "./FollowReducer";
import RepostReducer from "./RepostReducer";
import trendsReducer from "./TrendsReducer";
import profileReudcer from "./ProfileReducer";
import WhoToFollowReducer from "./WhoToFollowReducer";

const rootReducers = combineReducers({
  postsData: postReducer,
  trendsData: trendsReducer,
  repostData: RepostReducer,
  followData: followReducer,
  profileData: profileReudcer,
  who_to_followData: WhoToFollowReducer,
});

export default rootReducers;
