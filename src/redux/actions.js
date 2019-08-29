export const POSTS_RECEIVED = 'POSTS_RECEIVED';
export const POST_RECEIVED = 'POST_RECEIVED';
export const NEW_POST_RECEIVED = 'NEW_POST_RECEIVED';
export const NEW_COMMENT_RECEIVED = 'NEW_COMMENT_RECEIVED';
export const POST_DELETED = 'POST_DELETED';
export const POST_UPDATED = 'POST_UPDATED';
export const POST_CLEARED = 'POST_CLEARED';

const BASE_URL = 'https://simple-blog-api.crew.red';

export const getPosts = () => async(dispatch) => {
  await fetch(`${BASE_URL}/posts`)
    .then(res => res.json())
    .then(posts => (
      dispatch(receivePosts(posts))
    ));
};

export const receivePosts = posts => ({
  type: POSTS_RECEIVED,
  posts,
});

export const getPost = postId => async(dispatch) => {
  await fetch(`${BASE_URL}/posts/${postId}?_embed=comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(post => (
      dispatch(receivePost(post))
    ));
};

export const receivePost = post => ({
  type: POST_RECEIVED,
  post,
});

export const createPost = post => async(dispatch) => {
  await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(post),
  })
    .then(response => response.json())
    .then(postData => (
      dispatch(receiveNewPost(postData))
    ));

  await fetch(`${BASE_URL}/posts`)
    .then(res => res.json())
    .then(posts => (
      dispatch(receivePosts(posts))
    ));
};

export const receiveNewPost = post => ({
  type: NEW_POST_RECEIVED,
  post,
});

export const deletePost = postId => async(dispatch) => {
  await fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
    body: 'form-data',
  })
    .then(() => (
      dispatch({ type: POST_DELETED })
    ));

  await fetch(`${BASE_URL}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(posts => (
      dispatch(receivePosts(posts))
    ));
};

export const createComment = comment => async(dispatch) => {
  await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
    .then(response => response.json())
    .then(() => (
      dispatch(receiveNewComment())
    ));

  await fetch(`${BASE_URL}/posts/${comment.postId}?_embed=comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(post => (
      dispatch(receivePost(post))
    ));
};

export const receiveNewComment = () => ({
  type: NEW_COMMENT_RECEIVED,
});

export const editPost = post => async(dispatch) => {
  await fetch(`${BASE_URL}/posts/${post.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
    .then(response => response.json())
    .then(() => (
      dispatch(updatePost())
    ));

  await fetch(`${BASE_URL}/posts`)
    .then(res => res.json())
    .then(posts => (
      dispatch(receivePosts(posts))
    ));
};

export const updatePost = () => ({
  type: POST_UPDATED,
});

export const clearPost = () => ({
  type: POST_CLEARED,
});
