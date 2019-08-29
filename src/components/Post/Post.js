import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deletePost } from '../../redux/actions';
import './Post.css';
import EditPost from '../EditPost/EditPost';

class Post extends React.Component {
  state = {
    isEditing: false,
  };

  onEdit = () => {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
    }));
  };

  render() {
    const { post, deleteItem } = this.props;
    const { isEditing } = this.state;

    return (
      <div className="post">
        <div className="post__date">{post.date}</div>
        <div
          className="post__title"
        >
          {post.title}
        </div>
        <button
          type="button"
          className="post__btn-delete"
          title="delete"
          onClick={() => deleteItem(post.id)}
        >
          X
        </button>

        <div className="post__body">{post.body}</div>
        <button
          type="button"
          className="form__btn post__btn-update"
          onClick={this.onEdit}
        >
          {isEditing ? 'close edit' : 'edit post'}
        </button>
        {isEditing
        && (
          <EditPost
            postId={post.id}
            onEdit={this.onEdit}
            postTitle={post.title}
            postBody={post.body}
          />
        )}
        <NavLink
          className="post__link"
          to={`/${post.id}`}
        >
          Read the full post »
        </NavLink>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteItem: postId => dispatch(deletePost(postId)),

});

Post.propTypes = {
  post: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Post);
