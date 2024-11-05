const initialState = {
    reposts: [],
    loading: false,
    error: null,
  };
  
  const profileRepostsReducer = (state = initialState, action) => {
    switch (action.type) { 
      case "FETCH_PROFILE_REPOSTS_REQUEST":
        return {
          ...state,
          loading: true,
          error: null,
        };
      case "FETCH_PROFILE_REPOSTS_SUCCESS":
        return {
          ...state,
          reposts: action.payload,
          loading: false,
        };
      case "FETCH_PROFILE_REPOSTS_FAILURE":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      // case "LIKE_PROFILE_POST":
      //   return {
      //     ...state,
      //     reposts: {
      //       ...state.posts,
      //       postsData: Array.isArray(state.posts.postsData)
      //         ? state.posts.postsData.map((post) =>
      //             post._id === action.payload.id
      //               ? {
      //                   ...post,
      //                   is_like: action.payload.msg === "like_added",
      //                   like_count:
      //                     action.payload.msg === "like_added"
      //                       ? post.like_count + 1
      //                       : post.like_count > 0
      //                       ? post.like_count - 1
      //                       : 0,
      //                 }
      //               : post
      //           )
      //         : state.posts.postsData,
      //     },
      //   };
      // case "REPLY_PROFILE_POST":
      //   return {
      //     ...state,
      //     reposts: {
      //       ...state.reposts,
      //       postsData: state.reposts.postsData.map((post) =>
      //         post._id === action.payload.id
      //           ? {
      //               ...post,
      //               is_reply: action.payload.msg === "reply_added",
      //               replies_count:
      //                 action.payload.msg === "reply_added"
      //                   ? post.replies_count + 1
      //                   : post.replies_count > 0
      //                   ? post.replies_count - 1
      //                   : 0,
      //             }
      //           : post
      //       ),
      //     },
      //   };
      default:
        return state;
    }
  };
  
  export default profileRepostsReducer;
  