import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react'; 
import linksMessages from '../../common/app/linksMessages';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedHTMLMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router';

const messages = defineMessages({
  title: {
    defaultMessage: 'Articles',
    id: 'articles.page.title'
  },
});

class Page extends Component {
    static PropTypes = {
        children: PropTypes.object,
        intl: intlShape.isRequired,
    };

    render(){
      const { children, intl } = this.props;
      const title = intl.formatMessage(messages.title);
      return (
        <div className="articles-page">
          <Helmet title={title} />
          <Link activeClassName="active" to="/articles/new">
            <FormattedMessage {...linksMessages.newArticle} />
          </Link>
          {children}
        </div>

      )
    }
}

export default injectIntl(Page);
