import {
  POSTS_RECEIVED,
  POST_RECEIVED,
  NEW_POST_RECEIVED,
  NEW_COMMENT_RECEIVED,
  POST_DELETED,
  POST_UPDATED,
  POST_CLEARED,
} from './actions';

export const initialState = {
  posts: [],
  post: [],
  isLoaded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_RECEIVED:
      return {
        ...state,
        posts: action.posts,
        isLoaded: true,
      };

    case POST_RECEIVED:
      return {
        ...state,
        post: action.post,
      };

    case NEW_POST_RECEIVED:
      return {
        ...state,
      };

    case NEW_COMMENT_RECEIVED:
      return {
        ...state,
      };

    case POST_DELETED:
      return {
        ...state,
      };

    case POST_UPDATED:
      return {
        ...state,
      };

    case POST_CLEARED:
      return {
        ...state,
        post: [],
      };

    default:
      return state;
  }
};

export default reducer;
