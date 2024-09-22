const initialState = {
  repost: [],
  loading: false,
  error: null,
};

const RepostReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_REPOST_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_REPOST_SUCCESS":
      return {
        ...state,
        repost: action.payload,
        loading: false,
      };
    case "FETCH_REPOST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default RepostReducer;
