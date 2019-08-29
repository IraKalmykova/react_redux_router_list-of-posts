import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createComment } from '../../redux/actions';
import './CommentList.css';

class CommentList extends React.Component {
  state = {
    commentMap: {
      postId: '',
      body: '',
      id: '',
    },
  };

  handleFieldChange = (event) => {
    const { name, value } = event.target;
    const { postId } = this.props;

    this.setState(prevState => ({
      commentMap: {
        ...prevState.commentMap,
        [name]: value,
        postId,
      },
    }));
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { commentMap } = this.state;
    const { postComment } = this.props;

    if (commentMap.body) {
      postComment(commentMap);

      this.setState(prevState => ({
        commentMap: {
          ...prevState.commentMap,
          body: '',
          id: '',
        },
      }));
    }
  };

  render() {
    const { comments } = this.props;
    const { body } = this.state.commentMap;

    return (
      <>
        <form
          className="post__form"
          onSubmit={this.handleFormSubmit}
        >
          <input
            value={body}
            name="body"
            className="post__input"
            placeholder="Write a comment..."
            onChange={this.handleFieldChange}
          />
        </form>
        {
          !comments || comments.length === 0
            ? null
            : (
              <ul className="post__comments">
                {comments.map(comment => (
                  <li
                    className="post__comment"
                    key={comment.id}
                  >
                    {comment.body}
                  </li>

                ))}
              </ul>
            )
        }
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postComment: comment => dispatch(createComment(comment)),
});

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  postId: PropTypes.number.isRequired,
  postComment: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(CommentList);
