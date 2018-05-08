import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import '../../../assets/styles/forms.css';

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

TemplateCSV.propTypes = {
  type: PropTypes.string.isRequired,
};

export default TemplateCSV;

