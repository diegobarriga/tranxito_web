import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from '../../../assets/styles/forms.css';

class TemplateCSV extends React.Component {
render() {
    var path = `${process.env.PUBLIC_URL}/templates/drivers.csv`;
    console.log(path);
    return (
      <a href={path} download="template.csv" className="file">
      <FontAwesomeIcon icon="file-excel" size='2x'/> Download</a>
    );
  }
}

export default TemplateCSV
