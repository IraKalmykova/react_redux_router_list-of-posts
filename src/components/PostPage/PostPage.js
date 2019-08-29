import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost, clearPost } from '../../redux/actions';
import Loader from '../Loader/Loader';
import './PostPage.css';
import CommentList from '../CommentList/CommentList';

class PostPage extends React.Component {
  async componentDidMount() {
    this.props.payLoad(this.props.match.params.postId);
  }

  componentWillUnmount() {
    this.props.clearPostData();
  }

  render() {
    const { postData } = this.props;

    return (
      <>
        {postData.length === 0
          ? <Loader />
          : (
            <div className="post-wrap">
              <div className="post">
                <div className="post__date">{postData.date}</div>
                <div className="post__title">{postData.title}</div>
                <div className="post__body">{postData.body}</div>
                <CommentList
                  comments={postData.comments}
                  postId={postData.id}
                />
              </div>
            </div>
          )
        }
      </>
    );
  }
}

const mapStateToProps = state => ({
  postData: state.post,
});

const mapDispatchToProps = dispatch => ({
  payLoad: postId => dispatch(getPost(postId)),
  clearPostData: () => dispatch(clearPost()),
});

PostPage.propTypes = {
  postData: PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    length: PropTypes.number,
  }).isRequired,
  payLoad: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      postId: PropTypes.string,
    }),
  }).isRequired,
  clearPostData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
