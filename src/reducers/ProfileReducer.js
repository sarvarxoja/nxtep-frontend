const initialState = {
  profile: {},
  loading: false,
  error: null,
};

const profileReucer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_PROFILE_SUCCESS":
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case "FETCH_PROFILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default profileReucer;
