import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from '../../../assets/styles/forms.css';
import PropTypes from 'prop-types';

class TemplateCSV extends React.Component {
  render() {
    const path = `${process.env.PUBLIC_URL}/templates/${this.props.type}.csv`;
    const name = `${this.props.type}.csv`;
    return (
      <a href={path} download={name} className="file">
        <FontAwesomeIcon icon="file-excel" size="2x" /> Download
      </a>
    );
  }
}

export default TemplateCSV;

TemplateCSV.propTypes = {
  type: PropTypes.string.isRequired,
};
