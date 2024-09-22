const initialState = {
  trends: [],
  loading: false,
  error: null,
};

const trendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TRENDS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_TRENDS_SUCCESS":
      return {
        ...state,
        trends: action.payload,
        loading: false,
      };
    case "FETCH_TRENDS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default trendsReducer;
