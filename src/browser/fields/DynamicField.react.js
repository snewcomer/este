import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
<<<<<<< HEAD
=======
import classnames from 'classnames';
>>>>>>> 37f3a96510e99729db406c3300e95606ff1524ee
import { fields } from '../../common/lib/redux-fields';

class DynamicField extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
  };

  isDirty() {
    const { fields, item } = this.props;
    return fields.name.value !== item.name;
  }

  render() {
    const { fields } = this.props;

    return (
      <div className={classnames('dynamic-field', { 'is-dirty': this.isDirty() })}>
        <input
          {...fields.name}
          maxLength={100}
          type="text"
        />
      </div>
    );
  }

}

export default fields(DynamicField, {
  path: props => ['fieldsPage', 'dynamicFields', props.item.id],
  fields: ['name'],
  getInitialState: props => props.item
});
