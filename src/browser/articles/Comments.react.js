import './Comments.scss';
import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import Component from 'react-pure-render/component';
import { FormattedMessage, defineMessages } from 'react-intl';
import { submitComment } from '../../common/articles/actions';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const messages = defineMessages({
  commentPlaceholder: {
    defaultMessage: 'comment this article',
    id: 'articles.article.commentPlaceholder'
  },
});

export class Comments extends Component {
  renderComment(comment, i) {
    return (
      <div className="comment" key={i}>
        <p>
          <strong>{comment.user}:</strong>
          {comment.body}
          {comment.date}
          <button className="remove-comment">&times;</button>
        </p>
      </div>
    )
  }
  async onCommentSubmit({body}) {
    const { submitComment } = this.props;
    const { id } = this.props.params;
    debugger;
    try {
      await submitComment({body, id});
    } catch (error) {
      return error;
    }
  }
  render() {
    const { handleSubmit, fields } = this.props;
    return (
      <div className="comments">
        {this.props.articleComments.map(this.renderComment)}
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
}, null, { submitComment })(Comments);
