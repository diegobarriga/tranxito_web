import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import { translate } from 'react-i18next';
import '../../assets/styles/trucks.css';
import * as actions from '../../store/actions/index';
import api from '../../services/api';

class TrailerRow extends React.Component {
  onDeleteBtnClick(userId, token) {
    const confirmDelete = window.confirm('Are you sure you want to delete this trailer?');
    if (confirmDelete) {
      this.props.deleteTrailer(userId, token);
    }
  }

  render() {
    const pStyle = {
      justifyContent: 'flex-end',
    };
    const { t, id, model, manufacturer, number, year, gvw } = this.props;
    return (
      <div className="item no-padding">
        <div className="truck_wrapper">
          <figure className="left">
            <Link to={`/trailers/${this.props.id}`}>
              <img style={{ borderRadius: '50%' }} className="media-object" alt="trailer-img" width="100" src={api.images.trailersImageLink(this.props.image)} />
            </Link>
          </figure>
          <div className="right">
            <ul>
              <li>{model} - {manufacturer} ({year})</li>
              <li>{t('Serial Number')}: {number}</li>
              <li>{t('Gross Vehicle Weight')}: {gvw} kg</li>
            </ul>
          </div>
        </div>
        <div style={pStyle}>
          <Link className="btn btn-secondary btn-sm" to={`/trailers/${this.props.id}/edit`}><FontAwesomeIcon icon="edit" color="white" /></Link>{' '}
          <Button color="danger" size="sm" onClick={() => this.onDeleteBtnClick(this.props.id, this.props.token)}><FontAwesomeIcon icon="trash" color="white" /></Button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  deleteTrailer: (trailerId, token) => dispatch(actions.onTrailerDelete(trailerId, token)),
});


TrailerRow.propTypes = {
  model: PropTypes.string.isRequired,
  manufacturer: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  deleteTrailer: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const translateFunc = translate('translations')(TrailerRow);
export default connect(mapStateToProps, mapDispatchToProps)(translateFunc);
