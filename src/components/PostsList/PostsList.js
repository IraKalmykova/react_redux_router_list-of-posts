import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import './PostList.css';
import { getPosts } from '../../redux/actions';

class PostsList extends React.Component {
  async componentDidMount() {
    this.props.payLoad();
  }

  render() {
    const { posts } = this.props;

    return (
      <div className="posts-wrap">
        <div className="posts">
          {posts.map(post => (
            <Post post={post} key={post.id || Math.random()} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
  payLoad: () => dispatch(getPosts()),
});

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  payLoad: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
