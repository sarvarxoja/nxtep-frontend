const initialState = {
    who_to_follow: [],
    loading: false,
    error: null,
  };
  
  const WhoToFollowReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_PEOPLE_REQUEST":
        return {
          ...state,
          loading: true,
          error: null,
        };
      case "FETCH_PEOPLE_SUCCESS":
        return {
          ...state,
          who_to_follow: action.payload,
          loading: false,
        };
      case "FETCH_PEOPLE_FAILURE":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default WhoToFollowReducer;
  