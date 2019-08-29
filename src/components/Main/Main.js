import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PostPage from '../PostPage/PostPage';
import PostsList from '../PostsList/PostsList';
import NewPost from '../NewPost/NewPost';

const Main = () => (
  <Switch>
    <Route path="/" exact component={PostsList} />
    <Route path="/new-post" exact component={NewPost} />
    <Route
      path="/:postId"
      exact
      render={({ match }) => <PostPage match={match} />}
    />
  </Switch>
);

export default Main;
