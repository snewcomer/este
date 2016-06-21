import './Comments.scss';
import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import Component from 'react-pure-render/component';
import { FormattedMessage, defineMessages } from 'react-intl';
import { submitComment, removeComment } from '../../common/articles/actions';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const messages = defineMessages({
  commentPlaceholder: {
    defaultMessage: 'comment this article',
    id: 'articles.article.commentPlaceholder'
  },
});

export class Comments extends Component {
  static propTypes = {
    viewer: PropTypes.object
  };
  async onRemoveComment(comment_id) {
    const { removeComment } = this.props;
    const { id } = this.props.params;
    try {
      await removeComment({ id, comment_id });
    } catch (error) {
      return error;
    }
  }
  renderComment(comment, i) {
    return (
      <div className="comment" key={i}>
        <p>
          <strong>{comment.user}:</strong>
          {comment.body}
          {comment.date}
          <button className="remove-comment" onClick={this.onRemoveComment.bind(this, comment._id)}>&times;</button>
        </p>
      </div>
    )
  }
  async onCommentSubmit({ body }) {
    const { submitComment } = this.props;
    const { id } = this.props.params;
    // const { displayName:author='' } = this.props.viewer;
    try {
      await submitComment({body, author: 'scott', id});
    } catch (error) {
      return error;
    }
  }
  render() {
    const { handleSubmit, fields } = this.props;
    return (
      <div className="comments">
        {this.props.articleComments.map(this.renderComment.bind(this))}
        <form onSubmit={handleSubmit(this.onCommentSubmit.bind(this))}>
          <FormattedMessage {...messages.commentPlaceholder}>
            {message => <TextField
              {...fields.body}
              placeholder={message}
              className="comment-body"
            />}
          </FormattedMessage>
          <FlatButton label="Submit" type="submit" />
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'new-comment',
  fields: ['body']
}, state => ({ viewer: state.users.viewer }), { submitComment, removeComment })(Comments);
