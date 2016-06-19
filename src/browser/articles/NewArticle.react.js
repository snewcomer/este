import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import { submitNewArticle } from '../../common/articles/actions';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import { FormattedMessage, FormattedHTMLMessage, defineMessages } from 'react-intl';
import { focusInvalidField } from '../../common/lib/validation';
import { Button } from 'react-bootstrap';
// import { fields } from '../../common/lib/redux-fields';

// const messages = defineMessages({
//   title: {
//     defaultMessage: 'New Article',
//     id: 'articles.new.page.title'
//   },
// });

export class NewArticle extends Component {

  async onFormSubmit({title, body}) {
    // e.preventDefault;
    const { submitNewArticle } = this.props;
    try {
      await submitNewArticle({title, body});
    } catch (error) {
      focusInvalidField(this, error.reason);
      throw error;
    }
    browserHistory.push('/dashboard/articles');
  }

  render(){
    const { handleSubmit, fields } = this.props;
    return (
      <div className="articles-new-page">
        <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>Your Informative Title:</label>
            <input
              {...fields.title}
              className="form-control t-new-article-title"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Your Awesome Content:</label>
            <textarea
                {...fields.body}
                className="form-control t-new-article-body"
              />
          </fieldset>
          <Button type="submit" bsStyle="info">
            Submit New Article
          </Button>
        </form>
      </div>
    )
  }
}

// NewArticle = fields(NewArticle, {
//   path: 'new-article',
//   fields: ['title', 'body']
// });

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default reduxForm({
  form: 'new-article',
  fields: ['title', 'body']
}, mapStateToProps, { submitNewArticle })(NewArticle);
