const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_POSTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_POSTS_SUCCESS":
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case "FETCH_POSTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LIKE_POST":
      console.log(action);
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? {
                ...post,
                like: action.payload.msg === "like_added", // If `msg` is 'like_added', set `like` to true, otherwise false
                like_count:
                  action.payload.msg === "like_added"
                    ? post.like_count + 1 // Increase like_count if `msg` is 'like_added'
                    : post.like_count > 0
                    ? post.like_count - 1
                    : 0, // Decrease like_count if `msg` is not 'like_added'
              }
            : post
        ),
      };
    default:
      return state;
  }
};

export default postReducer;
