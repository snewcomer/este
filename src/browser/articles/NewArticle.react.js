import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import * as todosActions from '../../common/todos/actions';
import React, { PropTypes } from 'react';
import { FormattedMessage, FormattedHTMLMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
  title: {
    defaultMessage: 'New Article',
    id: 'articles.new.page.title'
  },
});

class NewArticle extends Component {
    static PropTypes = {
        intl: intlShape.isRequired,
    };
    render(){
      const { intl } = this.props;
      const title = intl.formatMessage(messages.title);
      return (
        <div className="articles-new-page">
          <Helmet title={title} />
            <h1>WAT</h1>
        </div>
      )
    }
}

export default injectIntl(NewArticle);

