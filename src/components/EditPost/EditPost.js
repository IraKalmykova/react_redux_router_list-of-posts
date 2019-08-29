import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editPost } from '../../redux/actions';
import './EditPost.css';

class EditPost extends React.Component {
  state = {
    postMap: {
      title: this.props.postTitle || '',
      body: this.props.postBody,
      id: this.props.postId,
    },
  };

  handleFieldChange = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      postMap: {
        ...prevState.postMap,
        [name]: value,
      },
    }));
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { postMap } = this.state;
    const { onEdit, updatePost } = this.props;

    onEdit();
    updatePost(postMap);
  }

  render() {
    const { title, body } = this.state.postMap;

    return (
      <form className="form-update">
        <input
          className="form__input-update"
          id="new-post-title"
          value={title}
          placeholder="Write a title"
          name="title"
          onChange={this.handleFieldChange}
        />
        <textarea
          value={body}
          name="body"
          placeholder="Write a body"
          spellCheck="true"
          onChange={this.handleFieldChange}
          className="form__textarea"
        >
          {body}
        </textarea>
        <button
          className={
            title && body
              ? 'form__btn post__btn-update'
              : 'form__btn post__btn-update form__btn--disabled'
          }
          type="submit"
          disabled={!(title && body)}
          onClick={this.handleFormSubmit}
        >
          Update post
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updatePost: post => dispatch(editPost(post)),
});

EditPost.propTypes = {
  postTitle: PropTypes.string.isRequired,
  postBody: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  postId: PropTypes.number,
};

EditPost.defaultProps = {
  postId: '',
};

export default connect(null, mapDispatchToProps)(EditPost);
