const initialState = {
  user: [],
  follow: [],
  loading: false,
  error: null,
};

const followReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_FOLLOW_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_FOLLOW_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.user,
        follow: action.payload,
      };
    case "FETCH_PROFILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: action.user,
      };
    default:
      return state;
  }
};

export default followReducer;