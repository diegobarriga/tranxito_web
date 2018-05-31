import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import '../../../assets/styles/forms.css';

class TemplateXLSX extends React.Component {
  render() {
    const path = `${process.env.PUBLIC_URL}/templates/${this.props.type}.xlsx`;
    const name = `${this.props.type}.xlsx`;
    return (
      <a href={path} download={name} className="file">
        <FontAwesomeIcon icon="file-excel" size="2x" /> Download.xlsx
      </a>
    );
  }
}

TemplateXLSX.propTypes = {
  type: PropTypes.string.isRequired,
};

export default TemplateXLSX;
