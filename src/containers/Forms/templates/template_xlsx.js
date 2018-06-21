import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { translate } from 'react-i18next';
import '../../../assets/styles/forms.css';

class TemplateXLSX extends React.Component {
  render() {
    const path = `${process.env.PUBLIC_URL}/templates/${this.props.type}.xlsx`;
    const name = `${this.props.type}.xlsx`;
    const { t } = this.props;
    return (
      <a href={path} download={name} className="file">
        <FontAwesomeIcon icon="file-excel" size="2x" /> {t('Download')}.xlsx
      </a>
    );
  }
}

TemplateXLSX.propTypes = {
  type: PropTypes.string.isRequired,
};

export default translate('translations')(TemplateXLSX);
