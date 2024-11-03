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
    case "ADD_NEW_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case "LIKE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>          
          post._id === action.payload.id
            ? {
                ...post,
                is_like: action.payload.msg === "like_added",
                like_count:
                  action.payload.msg === "like_added"
                    ? post.like_count + 1
                    : post.like_count > 0
                    ? post.like_count - 1
                    : 0,
              }
            : post
        ),
      };
    case "REPLY_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? {
                ...post,
                is_reply: action.payload.msg === "reply_added",
                replies_count:
                  action.payload.msg === "reply_added"
                    ? post.replies_count + 1
                    : post.replies_count > 0
                    ? post.replies_count - 1
                    : 0,
              }
            : post
        ),
      };

    default:
      return state;
  }
};

export default postReducer;
