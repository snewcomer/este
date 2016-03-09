import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react'; 
import { connect } from 'react-redux';

class Page extends Component {
    static PropTypes = {
      msg: PropTypes.object
    };

    render(){
      const { msg } = this.props;
      return (
        <div className="articles-page">
          <Helmet title={msg.title} />
        </div>
      )
    }
}

export default connect(state => ({ 
    msg: state.intl.msg.articles 
}))(Page);
