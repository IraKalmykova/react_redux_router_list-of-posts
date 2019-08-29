import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createPost } from '../../redux/actions';
import './NewPost.css';

class NewPost extends React.Component {
  state = {
    postMap: {
      title: '',
      body: '',
      id: 0,
      date: (new Date()).toISOString().slice(0, 10),
    },
  };

  handleFieldChange = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      postMap: {
        ...prevState.postMap,
        [name]: value,
        id: this.props.numberOfPosts + 1,
      },
    }));
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { postMap } = this.state;
    const { addPost } = this.props;

    addPost(postMap);

    this.setState(prevState => ({
      postMap: {
        ...prevState.postMap,
        title: '',
        body: '',
        id: this.props.numberOfPosts + 1,
      },
    }));
  }

  render() {
    const { title, body } = this.state.postMap;

    return (
      <div className="form">
        <fieldset className="form__fieldset">
          <div className="form__title">Add a new post</div>
          <form className="form__wrap">
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
              placeholder="Write a body"
              name="body"
              spellCheck="true"
              onChange={this.handleFieldChange}
              className="form__textarea"
            >
              {body}
            </textarea>
            <button
              className={
                (title && body)
                  ? 'form__btn'
                  : 'form__btn form__btn--disabled'
              }
              type="submit"
              onClick={this.handleFormSubmit}
              disabled={!(title && body)}
            >
              <NavLink
                to="/"
                className="form__btn-link"
              >
                Add
              </NavLink>
            </button>
          </form>
        </fieldset>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  numberOfPosts: state.posts.length,
});

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(createPost(post)),
});

NewPost.propTypes = {
  numberOfPosts: PropTypes.number.isRequired,
  addPost: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
